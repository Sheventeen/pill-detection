// import {
//   type JobContext,
//   WorkerOptions,
//   cli,
//   defineAgent,
//   voice,
// } from "@livekit/agents";
// import * as google from "@livekit/agents-plugin-google";
// import * as elevenlabs from "@livekit/agents-plugin-elevenlabs";
// import { BackgroundVoiceCancellation } from "@livekit/noise-cancellation-node";
// import { fileURLToPath } from "node:url";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env" });

// class Assistant extends voice.Agent {
//   constructor() {
//     super({
//       instructions: "You are a helpful voice AI assistant.",
//     });
//   }
// }

// const tts_voice = new elevenlabs.TTS({
//   apiKey: process.env.ELEVENLABS_API_KEY || "",
//   voice: {
//     id: "Z3R5wn05IrDiVCyEkUrK",
//     name: "Arabella",
//     category: "Narrative & Story",
//   },
// });

// const elevenlabsTTS = new elevenlabs.TTS({
//   apiKey: process.env.ELEVENLABS_API_KEY || "",
//   voice: {
//     id: "Z3R5wn05IrDiVCyEkUrK",
//     name: "Arabella",
//     category: "Narrative & Story",
//   },
//   modelID: "eleven_turbo_v2_5",
// });

// const geminiLLM = new google.beta.realtime.RealtimeModel({
//   model: "gemini-2.5-flash-native-audio-preview-09-2025",
//   temperature: 0.8,
//   instructions:
//     "You are a professional, compassionate medical AI assistant specializing in preliminary diagnostic image analysis. Your primary task is to review the chest X-ray image provided by the user and determine the likelihood of pneumonia. Do not provide a final medical diagnosis; instead, discuss potential findings, limitations, and recommend consulting a human physician. State your findings clearly and concisely.",
// });

// export default defineAgent({
//   entry: async (ctx: JobContext) => {
//     const session = new voice.AgentSession({
//       tts: elevenlabsTTS,
//       llm: geminiLLM,
//     });

//     await session.start({
//       agent: new Assistant(),
//       room: ctx.room,
//       inputOptions: {
//         noiseCancellation: BackgroundVoiceCancellation(),
//       },
//     });

//     await ctx.connect();

//     const handle = session.generateReply({
//       instructions:
//         "Greet the user and offer your assistance. You should start by speaking in English.",
//     });
//     await handle.waitForPlayout();
//   },
// });

// cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));

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

// Define the custom ElevenLabs voice ID you want to use
const CUSTOM_ELEVENLABS_VOICE_ID = "Z3R5wn05IrDiVCyEkUrK";

class Assistant extends voice.Agent {
  constructor() {
    super({
      instructions: "You are a helpful voice AI assistant.",
    });
  }
}

// 1. Create the ElevenLabs TextToSpeech component instance.
// Note: This uses the 'TextToSpeech' class (imported as 'elevenlabs'), not a simple 'TTS' class.
const elevenLabsTTS = new elevenlabs.TextToSpeech({
  // The API Key will be automatically read from the ELEVENLABS_API_KEY environment variable.
  // We explicitly set the voiceID here.
  voiceID: CUSTOM_ELEVENLABS_VOICE_ID,
  // You can also specify the ElevenLabs model if needed, e.g., "eleven_multilingual_v2"
  model: "eleven_turbo_v2",
});

export default defineAgent({
  entry: async (ctx: JobContext) => {
    // 2. Configure the AgentSession
    const session = new voice.AgentSession({
      llm: new google.beta.realtime.RealtimeModel({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",

        // IMPORTANT: REMOVE the 'voice' property here.
        // We only want the LLM for text generation and transcription.

        temperature: 0.8,
        // Update instructions to include the diagnostic persona
        instructions:
          "You are a professional, compassionate medical AI assistant specializing in preliminary diagnostic image analysis. Your primary task is to review the chest X-ray image provided by the user and determine the likelihood of pneumonia. Do not provide a final medical diagnosis; instead, discuss potential findings, limitations, and recommend consulting a human physician. State your findings clearly and concisely.",
      }),

      // 3. Inject the ElevenLabs component using the 'textToSpeech' property
      textToSpeech: elevenLabsTTS,
    });

    await session.start({
      agent: new Assistant(),
      room: ctx.room,
      inputOptions: {
        noiseCancellation: BackgroundVoiceCancellation(),
      },
    });

    await ctx.connect();

    // --- NEW LOGIC: Check for and include the X-ray image in the initial prompt ---

    // Get the latest file (the uploaded X-ray)
    const files = session.latestFiles;
    let initialInstructions =
      "Greet the user and offer your assistance. Tell them you are waiting for their X-ray image.";

    if (files && files.length > 0) {
      const xRayFile = files[0]; // Assuming the first file is the X-ray

      initialInstructions = [
        `Analyze the attached chest X-ray image.`,
        `Based on the image, provide a brief, high-level summary of any visible findings (like infiltrates or consolidation).`,
        `State your assessment of the likelihood of **pneumonia** (e.g., "The image shows signs consistent with," or "The image appears clear of obvious signs of...").`,
        `Conclude by stating clearly that this is an AI assessment and a licensed physician must be consulted for a definitive diagnosis.`,
        `Start by speaking in English.`,
      ].join(" ");

      // The 'files' array automatically attaches the image to the prompt payload.
      const handle = session.generateReply({
        instructions: initialInstructions,
        files: [xRayFile], // Attach the file to the prompt
      });
      await handle.waitForPlayout();
    } else {
      // If no file is present, just greet the user.
      const handle = session.generateReply({
        instructions:
          "Hello, I am MediTalk AI. Please upload your chest X-ray and click the 'Talk to Agent' button to begin the preliminary analysis.",
      });
      await handle.waitForPlayout();
    }
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));
