import 'dotenv/config';
import { OpenAI } from 'openai';

const model1 = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gemini = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});
const evaluatorModel = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getModelResponse(prompt) {
    const response1 = await model1.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
    });

    const response2 = await gemini.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }]
    });

    return [
        response1.choices[0].message.content,
        response2.choices[0].message.content
    ];
}

async function chooseBestResponse(prompt, response1, response2) {
    const evaluationPrompt = `
        You are a smart AI evaluator. 
        Given two responses to the same question, pick the best one or combine the common useful parts. 
        Provide a single concise response. 

        Question: ${prompt}

        Response 1: ${response1}
        Response 2: ${response2}

        Give the best and combined response in result
    `;

    const evalResponse = await evaluatorModel.chat.completions.create({
        model: 'gpt-4.1',
        messages: [{ role: "user", content: evaluationPrompt }]
    });

    return evalResponse.choices[0].message.content;
}

async function selfConsistencyPrompt(prompt) {
    const [resp1, resp2] = await getModelResponse(prompt);
    const finalAnswer = await chooseBestResponse(prompt, resp1, resp2);

    console.log("Response 1:", resp1);
    console.log("Response 2:", resp2);
    console.log("Final Answer:", finalAnswer);
}

selfConsistencyPrompt("how to improve communication skill if i am typical brown family indian middle class guy explain me deeply this thing");
