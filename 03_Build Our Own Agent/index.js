import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Crypto Currency Tool
const cryptoCurrency = async ({ coin, curr }) => {
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

const cryptoInfo = {
  name: "cryptoCurrency",
  description:
    "We can give you the current price or other information related to cryptocurrency like bitcoin and ethereum etc.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      coin: {
        type: Type.STRING,
        description:
          "It will be the name of cryptocurrency like bitcoin, ethereum etc.",
      },
    },
    required: ["coin"],
  },
};

const weatherInfo = {
  name: "weatherInformation",
  description:
    "You can get the currect weather information of any city like Bareilly, Delhi etc.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description:
          "Name of the city for which I have to fetch weather information like Bareilly, Delhi Etc.",
      },
    },
    required: ["city"],
  },
};
