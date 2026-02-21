import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedContent } from "../types";

const SYSTEM_INSTRUCTION = `
You are a world-class Conversion Rate Optimization (CRO) expert and Full-Stack Web Developer. 
Your task is to generate high-converting landing pages and visual prompts for affiliate marketers.

RULES FOR HTML GENERATION:
1.  **Structure**: Single-page, mobile-first, responsive.
2.  **Tech**: Pure HTML5, Internal CSS (<style>), Internal JS (<script>). NO external libraries (like Bootstrap/Tailwind) unless imported via CDN in the head. Use Google Fonts.
3.  **Design**: Modern, clean, trustworthy, high-contrast buttons.
4.  **Content**:
    *   **Hero**: Urgent Headline, Subhead, Primary CTA.
    *   **Benefits**: 3-4 Card layout with emojis as icons.
    *   **CTA Placement**: Top (Hero), Middle (After benefits), Bottom (Sticky or Footer).
    *   **Psychology**: Use urgency ("Limited Time", "Access Now") and curiosity.
5.  **Links**: ALL clickable elements (Buttons, Links) MUST use the provided 'adLink'.
    *   Target must be "_blank".
    *   Rel must be "noopener noreferrer".

RULES FOR THUMBNAIL PROMPT GENERATION:
1.  Target Model: Nano Banana (or similar high-quality text-to-image).
2.  Style: Hyper-realistic, Cinematic, Vibrant, YouTube Thumbnail style.
3.  Focus: High click-through rate (CTR), emotional appeal, strong contrast.
`;

export const generateCampaignAssets = async (topic: string, adLink: string): Promise<GeneratedContent> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      landingPageHTML: {
        type: Type.STRING,
        description: "The complete, valid HTML5 code for the landing page, including CSS and JS.",
      },
      thumbnailPrompt: {
        type: Type.STRING,
        description: "A highly detailed text-to-image prompt optimized for creating a click-worthy thumbnail.",
      },
    },
    required: ["landingPageHTML", "thumbnailPrompt"],
  };

  const prompt = `
    Topic: ${topic}
    Adsterra/Affiliate Link: ${adLink}

    Generate a complete HTML landing page and a thumbnail image prompt based on the topic above.
    Ensure the HTML is ready to copy-paste and works immediately.
    Ensure the HTML is visually attractive with a modern color palette suitable for the topic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Fast and capable of code generation
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Balance creativity with structure
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedContent;
    } else {
      throw new Error("No response generated from Gemini.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};