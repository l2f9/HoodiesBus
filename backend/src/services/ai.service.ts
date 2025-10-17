import { Ollama } from 'ollama';

class AIService {
  private ollama: Ollama;
  private model: string;

  constructor() {
    this.ollama = new Ollama({
      host: process.env.OLLAMA_HOST || 'http://localhost:11434',
    });
    this.model = process.env.OLLAMA_MODEL || 'llama3.2';
  }

  /**
   * Chat with AI assistant for hoodie design ideas
   */
  async chat(userMessage: string, conversationHistory: any[] = []): Promise<string> {
    try {
      const systemPrompt = `You are an AI design assistant for HoodiesBus, a platform for custom hoodie design and manufacturing.
Your role is to help users create amazing hoodie designs by:
- Suggesting color combinations and patterns
- Recommending fabric types based on use case
- Providing design inspiration and trends
- Helping users describe their vision clearly
- Converting natural language requests into specific design parameters

Be creative, friendly, and focused on fashion and streetwear aesthetics.`;

      const messages = [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...conversationHistory,
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const response = await this.ollama.chat({
        model: this.model,
        messages: messages,
        stream: false,
      });

      return response.message.content;
    } catch (error) {
      console.error('Ollama chat error:', error);
      // Return a fallback message instead of throwing
      return "🤖 AI Assistant is currently in setup mode. In production, I'll help you with design suggestions, color palettes, and style recommendations! For now, try exploring the designer tools to create your custom hoodie.";
    }
  }

  /**
   * Generate design suggestions based on user input
   */
  async generateDesignSuggestions(description: string): Promise<any> {
    try {
      const prompt = `Based on this design request: "${description}"

Generate a JSON response with design suggestions including:
1. Recommended hoodie type (oversized, zip-up, cropped, pullover, athletic)
2. Color palette (3-5 colors with hex codes)
3. Fabric recommendations
4. Print/pattern ideas
5. Target audience/style

Respond ONLY with valid JSON.`;

      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      try {
        return JSON.parse(response.response);
      } catch {
        // If JSON parsing fails, return a text response
        return {
          suggestions: response.response,
          parsed: false,
        };
      }
    } catch (error) {
      console.error('Design suggestion error:', error);
      // Return fallback suggestions
      return {
        hoodieType: 'pullover',
        colorPalette: ['#000000', '#FFFFFF', '#FF4136'],
        fabric: 'cotton',
        message: 'AI suggestions temporarily unavailable. Try these popular design elements!',
        parsed: false
      };
    }
  }

  /**
   * Analyze uploaded image for design inspiration
   */
  async analyzeImage(imageDescription: string): Promise<string> {
    try {
      const prompt = `Analyze this image/design: "${imageDescription}"

Provide:
1. Color palette extraction
2. Style identification
3. Suggested hoodie design elements
4. Similar design references

Be specific and actionable for a hoodie designer.`;

      const response = await this.ollama.generate({
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      return response.response;
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image');
    }
  }

  /**
   * Check if Ollama service is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.ollama.list();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get available models
   */
  async getAvailableModels(): Promise<string[]> {
    try {
      const models = await this.ollama.list();
      return models.models.map((m: any) => m.name);
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }
}

export default new AIService();
