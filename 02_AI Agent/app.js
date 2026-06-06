import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const main = async () => {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [],
    config: {
      systemInstruction: `You are a coding tutor strict rule to follow.
            - You will only answer the questions related to the coding.`,
    },
  });

  while (true) {
    let question = readlineSync.question("Ask me anything? ");

    if (question == "exit") {
      break;
    }

    let response = await chat.sendMessage({
      message: question,
    });
    
    console.log("Chat response: ", response.text);
  }
};

await main();
