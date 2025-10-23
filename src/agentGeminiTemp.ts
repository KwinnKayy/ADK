

// Time and Memory with friend on contact removing "—"

import { AgentBuilder } from "@iqai/adk";
import * as readline from "readline";
import * as dotenv from "dotenv";
import { chatAgentToolGemini } from "./chatAgentToolGemini.js";
import fs from "fs";
import path from "path";

dotenv.config();

// 🧠 Define the memory file path
const MEMORY_FILE = path.resolve("./src/memory.json");

// 🧠 Helper functions to load & save memory
function loadMemory() {
  try {
    if (!fs.existsSync(MEMORY_FILE)) {
      fs.writeFileSync(MEMORY_FILE, JSON.stringify({}, null, 2));
    }
    const data = fs.readFileSync(MEMORY_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading memory:", err);
    return {};
  }
}

function saveMemory(memory: any) {
  try {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
  } catch (err) {
    console.error("Error saving memory:", err);
  }
}

async function main() {
  console.log("🤖 KwinnKayy Chat Agent is now running!");
  console.log("Type your message below:\n");

  // 🧠 Load past memory
  let memory = loadMemory();

  const agent = await AgentBuilder.create("gemini_agent")
    .withModel("gemini-2.0-flash")
    .withInstruction(
      "You are a warm, friendly conversational assistant who remembers past conversations and refers to the user as 'friend'. Avoid using em dashes (—) or similar punctuation. Use clean, simple sentences instead."
    )
    .build();

  //if (agent.attachTool) {
  //  agent.attachTool(chatAgentToolGemini);
  //}

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (message) => {
    try {
      // 🕒 Step 1: dynamically inject the current time and date
      const now = new Date();
      const currentTime = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });

      const contextMessage = `The current date and time is ${currentTime}. Today's context should be considered up to this moment in ${now.getFullYear()}.`;

      // 🧠 Step 2: include memory context
      const memoryContext = memory.lastAgentReply
        ? `Previously, we talked about: ${memory.lastAgentReply}\nNow your friend says: `
        : "Your friend says: ";

      // 🧠 Step 3: combine everything into final message
      const finalMessage = `${contextMessage}\n\n${memoryContext}${message}`;

      let response = await agent.runner.ask(finalMessage);

      // 🚫 Step 4: clean up em dashes (—) or double hyphens (--) if they appear
      response = response
        .replace(/—/g, ",")
        .replace(/--/g, ",")
        .replace(/\s+,/g, ",")
        .replace(/\s+/g, " ")
        .trim();

      console.log("KwinnKayy:", response);

      // 🧠 Step 5: update memory
      memory.lastUserMessage = message;
      memory.lastAgentReply = response;
      saveMemory(memory);

    } catch (error) {
      console.error("KwinnKayy: Error:", error);
    }
  });
}

main().catch(console.error);

// Time and Memory with friend on contact removing "—"







