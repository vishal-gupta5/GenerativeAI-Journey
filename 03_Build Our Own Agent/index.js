import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Crypto Currency Tool
const cryptoCurrency = async ({ coin }) => {
  const response = await fetch(process.env.CRYPTO_API + coin);
  const data = await response.json();
  return data;
};

// Weather Information Tool
const weatherInformation = async ({ city }) => {
  const response = await fetch(process.env.WEATHER_API + city);
  const data = await response.json();
  return data;
};
