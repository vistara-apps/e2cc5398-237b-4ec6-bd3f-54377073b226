import OpenAI from 'openai';
import { IdeaGenerationRequest, IdeaExpansionRequest, Idea } from './types';
import { generateId } from './utils';
import { SAMPLE_IDEAS } from './constants';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export class AIService {
  static async generateIdea(request: IdeaGenerationRequest = {}): Promise<Idea> {
    try {
      const prompt = this.buildIdeaGenerationPrompt(request);
      
      const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: "You are a creative startup idea generator. Generate unique, practical, and innovative startup ideas that solve real problems."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.9,
      });

      const rawIdeaText = completion.choices[0]?.message?.content?.trim() || this.getFallbackIdea();

      return {
        ideaId: generateId(),
        rawIdeaText,
        createdAt: new Date(),
        industry: request.industry,
        techStack: request.techStack,
        revenueModel: request.revenueModel,
      };
    } catch (error) {
      console.error('Error generating idea:', error);
      return this.getFallbackIdeaObject(request);
    }
  }

  static async expandIdea(request: IdeaExpansionRequest): Promise<Partial<Idea>> {
    try {
      const expansions: Partial<Idea> = {};

      if (request.expandOneLiner) {
        expansions.oneLiner = await this.generateOneLiner(request.rawIdea);
      }

      if (request.expandDescription) {
        expansions.description = await this.generateDescription(request.rawIdea);
      }

      if (request.expandMarketAnalysis) {
        expansions.marketSummary = await this.generateMarketAnalysis(request.rawIdea);
      }

      if (request.expandValidationTips) {
        expansions.validationTips = await this.generateValidationTips(request.rawIdea);
      }

      return expansions;
    } catch (error) {
      console.error('Error expanding idea:', error);
      return this.getFallbackExpansions(request);
    }
  }

  private static async generateOneLiner(rawIdea: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "Create a compelling one-liner pitch for this startup idea. Make it catchy and memorable, under 20 words."
        },
        {
          role: "user",
          content: `Startup idea: ${rawIdea}`
        }
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content?.trim() || "Innovative solution for modern problems.";
  }

  private static async generateDescription(rawIdea: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "Write a detailed paragraph describing this startup idea, including the problem it solves, target audience, and key features."
        },
        {
          role: "user",
          content: `Startup idea: ${rawIdea}`
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content?.trim() || "This innovative startup addresses a significant market need through technology and user-centric design.";
  }

  private static async generateMarketAnalysis(rawIdea: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "Provide a brief market analysis for this startup idea, including market size, competition, and opportunities."
        },
        {
          role: "user",
          content: `Startup idea: ${rawIdea}`
        }
      ],
      max_tokens: 150,
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content?.trim() || "Growing market with significant opportunities for disruption and innovation.";
  }

  private static async generateValidationTips(rawIdea: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "Provide 3-4 practical tips for validating this startup idea, including specific actions the entrepreneur can take."
        },
        {
          role: "user",
          content: `Startup idea: ${rawIdea}`
        }
      ],
      max_tokens: 150,
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content?.trim() || "Start with customer interviews, create an MVP, test with early adopters, and gather feedback.";
  }

  private static buildIdeaGenerationPrompt(request: IdeaGenerationRequest): string {
    let prompt = "Generate a unique startup idea that solves a real problem.";
    
    if (request.industry) {
      prompt += ` Focus on the ${request.industry} industry.`;
    }
    
    if (request.techStack) {
      prompt += ` Use ${request.techStack} technology.`;
    }
    
    if (request.revenueModel) {
      prompt += ` Consider a ${request.revenueModel} revenue model.`;
    }
    
    prompt += " Keep it concise and practical.";
    
    return prompt;
  }

  private static getFallbackIdea(): string {
    return SAMPLE_IDEAS[Math.floor(Math.random() * SAMPLE_IDEAS.length)];
  }

  private static getFallbackIdeaObject(request: IdeaGenerationRequest): Idea {
    return {
      ideaId: generateId(),
      rawIdeaText: this.getFallbackIdea(),
      createdAt: new Date(),
      industry: request.industry,
      techStack: request.techStack,
      revenueModel: request.revenueModel,
    };
  }

  private static getFallbackExpansions(request: IdeaExpansionRequest): Partial<Idea> {
    return {
      oneLiner: request.expandOneLiner ? "Innovative solution for modern problems." : undefined,
      description: request.expandDescription ? "This startup addresses a significant market need through technology and user-centric design, providing value to customers while building a sustainable business model." : undefined,
      marketSummary: request.expandMarketAnalysis ? "Growing market with significant opportunities for disruption and innovation. Competition exists but there's room for differentiation." : undefined,
      validationTips: request.expandValidationTips ? "1. Conduct customer interviews 2. Build an MVP 3. Test with early adopters 4. Gather and iterate on feedback" : undefined,
    };
  }
}
