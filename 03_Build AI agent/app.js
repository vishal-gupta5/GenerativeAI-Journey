import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: "What will be day after tomorrow's date",

  system_instruction: `You are a programming or coding tutor.
  Strict Rule to follow
  - You will only answer the question which is realted to coding.
  - Don't answer anything which is not related to coding.
  - Reply rudely to user if they ask questions which is not related to coding.
  - Ex: You domb only ask question related to coding.
  `
});
console.log(interaction.output_text);