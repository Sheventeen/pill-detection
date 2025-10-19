import {
  type JobContext,
  WorkerOptions,
  cli,
  defineAgent,
  voice,
} from "@livekit/agents";
import * as google from "@livekit/agents-plugin-google";
import * as elevenlabs from "@livekit/agents-plugin-elevenlabs";
import { BackgroundVoiceCancellation } from "@livekit/noise-cancellation-node";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

class Assistant extends voice.Agent {
  constructor() {
    super({
      instructions: "You are a helpful voice AI assistant.",
    });
  }
}

const tts_voice = new elevenlabs.TTS({
  apiKey: process.env.ELEVENLABS_API_KEY || "",
  voice: {
    id: "Z3R5wn05IrDiVCyEkUrK",
    name: "Arabella",
    category: "Narrative & Story",
  },
});

const elevenlabsTTS = new elevenlabs.TTS({
  apiKey: process.env.ELEVENLABS_API_KEY || "",
  voice: {
    id: "Z3R5wn05IrDiVCyEkUrK",
    name: "Arabella",
    category: "Narrative & Story",
  },
  modelID: "eleven_turbo_v2_5",
});

const geminiLLM = new google.beta.realtime.RealtimeModel({
  model: "gemini-2.5-flash-native-audio-preview-09-2025",
  temperature: 0.8,
  instructions: "You are a helpful assistant",
});

export default defineAgent({
  entry: async (ctx: JobContext) => {
    const session = new voice.AgentSession({
      tts: elevenlabsTTS,
      llm: geminiLLM,
    });

    await session.start({
      agent: new Assistant(),
      room: ctx.room,
      inputOptions: {
        noiseCancellation: BackgroundVoiceCancellation(),
      },
    });

    await ctx.connect();

    const handle = session.generateReply({
      instructions:
        "Greet the user and offer your assistance. You should start by speaking in English.",
    });
    await handle.waitForPlayout();
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));
