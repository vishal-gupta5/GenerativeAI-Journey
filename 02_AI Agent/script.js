import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const main = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `Current User is Vishal, and his age is 25 and current date is: ${new Date()}`,
    },
    contents: "What's my name is?",
  });
  console.log(response.text);
};

await main();
