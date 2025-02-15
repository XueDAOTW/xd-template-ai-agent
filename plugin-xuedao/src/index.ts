import { Plugin } from "@elizaos/core";
import { getTemplateAction } from "./actions/getTemplateAction";
import { templateProvider } from "./providers/templateProvider";

export const xuedaoPlugin: Plugin = {
    name: "btc",
    description: "BTC plugin for Eliza",
    actions: [getTemplateAction],
    // evaluators analyze the situations and actions taken by the agent. they run after each agent action
    // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
    evaluators: [],
    // providers supply information and state to the agent's context, help agent access necessary data
    providers: [templateProvider],
};
export default xuedaoPlugin;