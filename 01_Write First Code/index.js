import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY

const ai = new GoogleGenAI({apiKey});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "What's up?",
  });

  console.log(response.text);
}

main();