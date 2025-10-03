import 'dotenv/config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import OpenAI from 'openai';

const client = new OpenAI();

async function chat() {
    const userQuery = 'Tell me about adding two number in python';
    // const userQuery = 'Tell me about components in react and also the source';
    // const userQuery = 'Tell me about debugging in nodejs and give me some examples and source also';

    // Ready the client OpenAI Embedding Model
    const embeddings = new OpenAIEmbeddings({
        model: 'text-embedding-3-large',
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url: 'http://localhost:6333',
            collectionName: 'chaicode-collection',
        }
    );

    const vectorSearcher = vectorStore.asRetriever({
        k: 3,
    });

    const relevantChunk = await vectorSearcher.invoke(userQuery);

    const SYSTEM_PROMPT = `
        You are an AI assistant who helps resolving user query based on the context available to you from a PDF file with the content and page number.

        Only ans based on the available context from file only.

        Context: 
        ${JSON.stringify(relevantChunk)}
    `;

    const response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userQuery },
        ],
    });

    console.log(`${response.choices[0].message.content}`);
}

chat();
