import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: "Hello Gemini! How are you dear",
});

console.log(interaction.output_text);