import { type IAgentRuntime, type Memory, type Provider, type State, elizaLogger } from "@elizaos/core";
import { Template } from "../types";

const CACHE_KEY = 'xuedao:template';
const CACHE_TTL = 15 * 60; // 15 minutes
const MAX_RETRIES = 3;


async function fetchtemplate(runtime: IAgentRuntime): Promise<Template[]> {
    // Fetch data from Raydium, Orca and Meteora
    try {
        const combinedData: Template[] = [{test:'aaa',number: 5},{test:'bbb',number: 10},{test:'ccc',number: 15}]; // Initialize an array to hold the combined data
        return combinedData
    } catch (error) {
        elizaLogger.error("Error fetching template data from birdeye: " , error);
        throw error; // Rethrow the error for further handling
    }
}

async function fetchWithRetry(runtime: IAgentRuntime): Promise<Template[]> {
    let lastError: Error | null = null;

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            return await fetchtemplate(runtime);
        } catch (error) {
            lastError = error;
            elizaLogger.error(`Templates fetch attempt ${i + 1} failed:`, error);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }

    throw lastError || new Error("Failed to fetch BTCLPs after multiple attempts");
}

async function getTemplate(runtime: IAgentRuntime): Promise<Template[]> {
    try {
        // Try to get from cache first
        const cached = await runtime.cacheManager.get<Template[]>(CACHE_KEY);
        if (cached) {
            return cached;
        }
        elizaLogger.debug("Cache not found, Run fetchBTCLPs")
        // Fetch fresh data
        const Template = await fetchWithRetry(runtime);

        // Cache the result
        await runtime.cacheManager.set(CACHE_KEY, Template, { expires: CACHE_TTL });

        return Template;
    } catch (error) {
        elizaLogger.error("Error fetching coins:", error);
        throw error;
    }
}

function formatTemplateContext(templateData: Template[]): string {
    // Insight overview for the agent to provide detailed responses
    const insight = `
As an expert AI agent in template analysis Template:

**template Data Overview:**
${templateData.map(data => `- **test**: ${data.test}, **Current number**: $${data.number}}`).join('\n')}
`.trim();
    return insight;
}

export const templateProvider: Provider = {
    get: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<string> =>  {
        try {
            const BTCLPs = await getTemplate(runtime);
            const data = formatTemplateContext(BTCLPs);
            elizaLogger.debug("template Provider data", data);
            return data
        } catch (error) {
            elizaLogger.error("template Provider error:", error);
            return "template information is temporarily unavailable. Please try again later.";
        }
    },
};
