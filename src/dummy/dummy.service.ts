import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as nodemailer from 'nodemailer';

@Injectable()
export class DummyService {
  getPrices() {
    throw new Error('Method not implemented.');
  }
  static setPriceAlert(arg0: string, arg1: number, arg2: string) {
    throw new Error('Method not implemented.');
  }
  private prices = []; // In-memory storage for prices
  private priceAlerts = {}; // Store price alerts for each chain

  // Cron job to fetch prices every 5 minutes
  @Cron('*/5 * * * *')
 // Fetch prices for Ethereum and Polygon and save the price data
 async fetchAndSavePrices(): Promise<{ ethereum: number | null, polygon: number | null }> {
  try {
    const chains = ['ethereum', 'matic-network'];
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${chains.join(',')}&vs_currencies=usd`,
    );

    console.log('API response:', response.data); // Log the full response

    // Prepare the result object with null values initially
    let result = {
      ethereum: null,
      polygon: null,
    };

    // Loop through each chain
    for (const chain of chains) {
      const price = response.data[chain]?.usd;

      if (price) {
        const timestamp = new Date();
        console.log(`[${timestamp.toISOString()}] ${chain}: $${price}`);

        // Check for price increase and if an alert is set
        const lastPriceData = this.prices.find(
          (data) => data.chain === chain && this.isWithinOneHour(data.timestamp, timestamp),
        );

        if (lastPriceData) {
          const priceDifference = (price - lastPriceData.price) / lastPriceData.price;

          // If price increased by more than 3%, check for alert
          if (priceDifference > 0.03) {
            // Check if a price alert exists for the chain
            if (this.priceAlerts[chain]) {
              await this.sendEmailNotification(chain, price, lastPriceData.price);
            }
          }
        }

        // Save the new price data
        this.prices.push({ chain, price, timestamp });

        // Set the result object for the respective chain
        if (chain === 'ethereum') {
          result.ethereum = price;
        } else if (chain === 'matic-network') {
          result.polygon = price;
        }
      } else {
        console.log(`No price data found for ${chain}`);
      }
    }

    // Return the result object containing ethereum and polygon prices
    return result;

  } catch (error) {
    console.error('Error fetching prices:', error.message);
    return { ethereum: null, polygon: null }; // Return null if there's an error
  }
}


  // Function to set a price alert for a given chain
  setPriceAlert(chain: string, alert: boolean) {
    this.priceAlerts[chain] = alert;
    console.log(`Price alert for ${chain} set to ${alert}`);
  }

  // Helper function to check if the timestamp is within one hour
  private isWithinOneHour(lastTimestamp: Date, currentTimestamp: Date): boolean {
    const oneHourInMillis = 60 * 60 * 1000;
    return currentTimestamp.getTime() - lastTimestamp.getTime() <= oneHourInMillis;
  }

  // Function to send email notification
  private async sendEmailNotification(chain: string, newPrice: number, oldPrice: number) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider's service
      auth: {
        user: 'lodhihasnainhaider@gmail.com', // Your email
        pass: 'pgkb wbwh wevj hino', // Your email password (or app-specific password)
      },
    });

    const mailOptions = {
      from: 'lodhihasnainhaider@gmail.com',
      to: 'hyperhire_assignment@hyperhire.in',
      subject: `Price Alert: ${chain} Increased by More Than 3%`,
      text: `The price of ${chain} has increased by more than 3%!\n\nOld Price: $${oldPrice}\nNew Price: $${newPrice}\n\nPlease take the necessary action.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent for ${chain} price increase.`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}


export class SwapService {
  // Fetch the current price of ETH to BTC and USD
  async getSwapRate(ethAmount: number) {
    try {
      // Get current prices of ETH and BTC in USD
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd');
      
      const ethToUsd = response.data.ethereum.usd; // ETH price in USD
      const btcToUsd = response.data.bitcoin.usd; // BTC price in USD
      const ethToBtc = response.data.ethereum.usd / response.data.bitcoin.usd; // ETH to BTC conversion rate
      
      // Calculate the BTC amount user will get for the input ETH amount
      const btcAmount = ethAmount * ethToBtc;
      
      // Calculate the fee in ETH and USD
      const feePercentage = 0.03; // 3% fee
      const feeInEth = ethAmount * feePercentage;
      const feeInUsd = feeInEth * ethToUsd; // Fee in USD

      // Return the result
      return {
        btcAmount,
        feeInEth,
        feeInUsd,
        feePercentage,
      };
    } catch (error) {
      console.error('Error fetching swap rate:', error.message);
      throw new Error('Error fetching swap rate');
    }
  }
}