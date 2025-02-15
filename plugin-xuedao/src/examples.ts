import { ActionExample } from "@elizaos/core";

export const getTemplateExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Give me a template response?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me send a template to you.",
                action: "XUEDAO_TEMPLATE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "How are you?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I am fine thank you and you",
                action: "XUEDAO_TEMPLATE",
            },
        }
    ],
]