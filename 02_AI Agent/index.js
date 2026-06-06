import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const main = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Hello Gemini? How are you?",
  });
  console.log(response.text);
};

await main();
