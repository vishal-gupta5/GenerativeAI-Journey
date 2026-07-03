import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";
import readlineSync from "readline-sync";

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

const tools = [
  {
    cryptoCurrency,
    weatherInfo,
  },
];

const toolFunction = {
  weatherInformation: weatherInformation,
  cryptoCurrency: cryptoCurrency,
};

let History = [];

const runAgent = async () => {
  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: { tools },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];
      const { name, args } = functionCall;

      const result = await toolFunction[name](args);

      const functionResponsePart = {
        name: functionCall.name,
        response: {
          result: result,
        },
        id: functionCall.id,
      };

      // Send the function response back to the model.

      History.push({
        role: "model",
        parts: [
          {
            functionCall: functionCall,
          },
        ],
      });

      History.push({
        role: "user",
        parts: [
          {
            functionResponse: functionResponsePart,
          },
        ],
      });
    } else {
      History.push({
        role: "model",
        parts: [{ text: response.text }],
      });
      console.log(response.text);
    }
  }
};

while (true) {
  const question = readlineSync.question("Ask me anything? ");

  if (question === "exit") {
    break;
  }

  History.push({
    role: "user",
    parts: [{ text: question }],
  });

  await runAgent();
}
