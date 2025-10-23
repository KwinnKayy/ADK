/*
import "dotenv/config";
import { createTool } from "@iqai/adk";
import * as z from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Use the free conversational model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Simple memory within session
let conversationHistory: { role: "user" | "model"; content: string }[] = [];

export const chatAgentToolGemini = createTool({
  name: "chat_agent_gemini",
  description: "A conversational AI tool powered by Google's Gemini model.",
  schema: z.object({
    message: z.string().describe("User message"),
  }),
  async func({ message }) {
    conversationHistory.push({ role: "user", content: message });

    const prompt =
      conversationHistory
        .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
        .join("\n") + "\nAI:";

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    conversationHistory.push({ role: "model", content: reply });

    return { reply };
  },
});
*/



/*
import { createTool } from "@iqai/adk";
import * as z from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const chatAgentToolGemini = createTool({
  name: "chatAgentToolGemini",
  description: "A conversational Gemini-powered AI chat agent",
  schema: z.object({
    message: z.string().describe("The message from the user"),
  }),
  async func({ message }) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(message);
      const response = result.response.text();
      return { response };
    } catch (error: any) {
      return { response: `Error: ${error.message}` };
    }
  },
});
*/




/*
import { createTool } from "@iqai/adk";
import * as z from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const chatAgentToolGemini = createTool({
  name: "chatAgentToolGemini",
  description: "A conversational Gemini-powered AI chat agent",
  schema: z.object({
    message: z.string().describe("The message from the user"),
  }),
  async func({ message }) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(message);
      const response = result.response.text();
      return { response };
    } catch (error: any) {
      return { response: `Error: ${error.message}` };
    }
  },
});
*/




// src/chatAgentToolGemini.ts
import { createTool } from "@iqai/adk";
import * as z from "zod";

// Define a simple tool to test Gemini integration
export const chatAgentToolGemini = createTool({
  name: "echo_tool",
  description: "Repeats back whatever text the user says, used for testing Gemini.",
  schema: z.object({
    message: z.string().describe("The message to echo back."),
  }),
  fn: async ({ message }) => {
    return `Echo: ${message}`;
  },
});
