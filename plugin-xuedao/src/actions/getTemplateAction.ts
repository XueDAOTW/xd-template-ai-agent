import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { Template } from "../types";
import { getTemplateExamples } from "../examples";


export const getTemplateAction: Action = {
    name: "TEMPLATE",
    similes: [
        "SOL",
        "BTC",
        "TRADES"
    ],
    description: "Get SOL BTC DATA",
    validate: async (runtime: IAgentRuntime) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {

        try {
            const templateData : Template[] = [{test:'aaa',number: 5},{test:'bbb',number: 10},{test:'ccc',number: 15}];
            elizaLogger.success(
                `Successfully fetched SOL Price`
            );
            if (callback) {
                callback({
                    text: `
As an expert AI agent in template analysis Action:

**template Data Overview:**
${templateData.map(data => `- **test**: ${data.test}, **Current number**: $${data.number}}`).join('\n')}
`
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in BTC plugin handler:", error);
            callback({
                text: `Error fetching SOL Price DATA: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getTemplateExamples as ActionExample[][],
} as Action;