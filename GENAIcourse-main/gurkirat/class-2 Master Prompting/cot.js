// import 'dotenv/config';
// import { OpenAI } from 'openai';

// const client = new OpenAI();

// async function main() {
//     const SYSTEM_PROMPT = `
//         You are an AI assistant who works on START, THINK and OUTPUT format.
//         For a given user query first think and breakdown the problem into sub problems.
//         You should always keep thinking and thinking before giving the actual output.
//         Also, before outputing the final result to user you must check once if everything is correct.

//         Rules:
//         - Strictly follow the output JSON format
//         - Always follow the output in sequence that is START, THINK and OUTPUT.
//         - Always perform only one step at a time and wait for other step.
//         - Alway make sure to do multiple steps of thinking before giving out output.

//         Output JSON Format:
//         { "step": "START | THINK | OUTPUT", "content": "string" }

//         Example:
//         User: Can you solve 3 + 4 * 10 - 4 * 3
//         ASSISTANT: { "step": "START", "content": "The user wants me to solve 3 + 4 * 10 - 4 * 3 maths problem" } 
//         ASSISTANT: { "step": "THINK", "content": "This is typical math problem where we use BODMAS formula for calculation" } 
//         ASSISTANT: { "step": "THINK", "content": "Lets breakdown the problem step by step" } 
//         ASSISTANT: { "step": "THINK", "content": "As per bodmas, first lets solve all multiplications and divisions" }
//         ASSISTANT: { "step": "THINK", "content": "So, first we need to solve 4 * 10 that is 40" } 
//         ASSISTANT: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 4 * 3" }
//         ASSISTANT: { "step": "THINK", "content": "Now, I can see one more multiplication to be done that is 4 * 3 = 12" } 
//         ASSISTANT: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 12" } 
//         ASSISTANT: { "step": "THINK", "content": "As we have done all multiplications lets do the add and subtract" } 
//         ASSISTANT: { "step": "THINK", "content": "so, 3 + 40 = 43" } 
//         ASSISTANT: { "step": "THINK", "content": "new equations look like 43 - 12 which is 31" } 
//         ASSISTANT: { "step": "THINK", "content": "great, all steps are done and final result is 31" }
//         ASSISTANT: { "step": "OUTPUT", "content": "3 + 4 * 10 - 4 * 3 = 31" } 
//     `;

//     const messages = [
//         {
//             role: "assistant",
//             content: SYSTEM_PROMPT
//         },
//         {
//             role: "user",
//             content: "What is recursion in C++ explain me deeply with examples ?"
//         }
//     ];

//     while (true) {
//         const response = await client.chat.completions.create({
//             model: 'gpt-4.1-mini',
//             messages: messages
//         })

//         const rawContent = response.choices[0].message.content;
//         const parsedContent = JSON.parse(rawContent);

//         messages.push({
//             role: 'assistant',
//             content: JSON.stringify(parsedContent)
//         })

//         if (parsedContent.step === 'START') {
//             console.log(`🔥`, parsedContent.content);
//             continue;
//         }

//         if (parsedContent.step === 'THINK') {
//             console.log(`🧠`, parsedContent.content);
//             continue;
//         }

//         if (parsedContent.step === 'OUTPUT') {
//             console.log(`🤖`, parsedContent.content);
//             break;
//         }
//     }

//     console.log("Done from my side !!")
// }

// main();





// WITH EVALUATE

import 'dotenv/config';
import { OpenAI } from 'openai';

const client = new OpenAI(
    { apiKey: process.env.OPENAI_API_KEY }
);

const gemini = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

function safeParseJSON(str) {
    // Remove ```json or ``` and trim whitespace
    str = str.replace(/```(json)?/g, '').trim();

    try {
        return JSON.parse(str);
    } catch (err) {
        console.error('Error parsing JSON:', str);
        return { step: 'EVALUATE', content: 'Gemini response parsing failed' };
    }
}

async function evaluationWithGemini(thinkingContent) {
    const PROMPT = `
        You are a judge AI. Evaluate if the following AI's thinking step is correct and helpful to reach the correct solution.
        
        Rules:
        - Respond ONLY in JSON format.

        Output JSON Format:
        { "step": "EVALUATE", "content": "string" }

        THINKING: "${thinkingContent}"
    `;

    const response = await gemini.chat.completions.create({
        model: 'gemini-2.0-flash',
        messages: [
            { role: 'system', content: "You are a strict AI evaluator and you are working as a strict llm as a judge to evaluate whether this response is correct or not" },
            { role: 'user', content: PROMPT },
        ],
    });

    const raw = response.choices[0].message.content;
    return safeParseJSON(raw);
}

async function main() {
    // These api calls are stateless (Chain Of Thought)
    const SYSTEM_PROMPT = `
    You are an AI assistant who works on START, THINK and OUTPUT format.
    For a given user query first think and breakdown the problem into sub problems.
    You should always keep thinking and thinking before giving the actual output.
    Also, before outputing the final result to user you must check once if everything is correct.

    Rules:
    - Strictly follow the output JSON format
    - Always follow the output in sequence that is START, THINK, EVALUATE and OUTPUT.
    - After evey think, there is going to be an EVALUATE step that is performed manually by someone and you need to wait for it.
    - Always perform only one step at a time and wait for other step.
    - Alway make sure to do multiple steps of thinking before giving out output.

    Output JSON Format:
    { "step": "START | THINK | EVALUATE | OUTPUT", "content": "string" }

    Example:
    User: Can you solve 3 + 4 * 10 - 4 * 3
    ASSISTANT: { "step": "START", "content": "The user wants me to solve 3 + 4 * 10 - 4 * 3 maths problem" } 
    ASSISTANT: { "step": "THINK", "content": "This is typical math problem where we use BODMAS formula for calculation" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "Lets breakdown the problem step by step" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "As per bodmas, first lets solve all multiplications and divisions" }
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" }  
    ASSISTANT: { "step": "THINK", "content": "So, first we need to solve 4 * 10 that is 40" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 4 * 3" }
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "Now, I can see one more multiplication to be done that is 4 * 3 = 12" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 12" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "As we have done all multiplications lets do the add and subtract" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "so, 3 + 40 = 43" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "new equations look like 43 - 12 which is 31" } 
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" } 
    ASSISTANT: { "step": "THINK", "content": "great, all steps are done and final result is 31" }
    ASSISTANT: { "step": "EVALUATE", "content": "Alright, Going good" }  
    ASSISTANT: { "step": "OUTPUT", "content": "3 + 4 * 10 - 4 * 3 = 31" } 
  `;

    const messages = [
        {
            role: 'system',
            content: SYSTEM_PROMPT,
        },
        {
            role: 'user',
            content: 'give me a to z code for making a signin and signup functionality in nodejs, i am a beginner explain me each and everyhting and also give me code for this. give me all folder structure and all file code in one go.',
        },
    ];

    while (true) {
        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: messages,
        });

        const rawContent = response.choices[0].message.content;
        const parsedContent = JSON.parse(rawContent);

        messages.push({
            role: 'assistant',
            content: JSON.stringify(parsedContent),
        });

        if (parsedContent.step === 'START') {
            console.log(`🔥`, parsedContent.content);
            continue;
        }

        if (parsedContent.step === 'THINK') {
            console.log(`🧠`, parsedContent.content);

            // // Todo: Send the messages as history to maybe gemini and ask for a review and append it to history
            // // LLM as a judge techniuqe
            // messages.push({
            //     role: 'developer',
            //     content: JSON.stringify({
            //         step: 'EVALUATE',
            //         content: 'Nice, You are going on correct path',
            //     }),
            // });

            const evaluation = await evaluationWithGemini(parsedContent.content);
            console.log(`✅ Gemini Evaluation:`, evaluation.content);

            // Append Gemini evaluation to message history
            messages.push({
                role: 'developer',
                content: JSON.stringify(evaluation),
            });

            continue;
        }

        if (parsedContent.step === 'OUTPUT') {
            console.log(`🤖`, parsedContent.content);
            break;
        }
    }

    console.log('Done !!');
}

main();
