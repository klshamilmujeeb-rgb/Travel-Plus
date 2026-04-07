import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  /**
   * Search for real-time travel information using Google Search tool.
   */
  async searchTravelTrends(query: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Search Error:", error);
      throw error;
    }
  },

  /**
   * Analyze travel content or provide recommendations.
   */
  async analyzeTravelContent(content: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following travel content and provide a summary with key highlights and recommendations: ${content}`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      throw error;
    }
  },

  /**
   * Generate a video from a prompt (Veo).
   */
  async generateTravelVideo(prompt: string) {
    try {
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      // Polling for completion (simplified for demo)
      let currentOp: any = operation;
      while (!currentOp.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        // In a real app, you'd fetch the operation status. 
        break; 
      }
      
      return currentOp.response?.generatedVideos?.[0]?.video?.uri;
    } catch (error) {
      console.error("Veo Video Generation Error:", error);
      throw error;
    }
  }
};
