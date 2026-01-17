import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getClient = () => {
  if (!aiClient) {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing in environment variables.");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const initializeChat = async () => {
  const client = getClient();
  if (!client) return null;

  try {
    chatSession = client.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string, onChunk: (text: string) => void) => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    onChunk("Désolé, je n'ai pas pu initialiser la connexion neuronale. Vérifiez la clé API.");
    return;
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });
    
    let fullText = "";
    for await (const chunk of resultStream) {
        // Ensure we handle the response type correctly
        const chunkText = chunk.text;
        if (chunkText) {
            fullText += chunkText;
            onChunk(fullText);
        }
    }
  } catch (error) {
    console.error("Error sending message:", error);
    onChunk("Une perturbation dans le flux de données a empêché la réponse.");
  }
};