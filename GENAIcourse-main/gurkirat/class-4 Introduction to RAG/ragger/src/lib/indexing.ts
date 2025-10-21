import 'dotenv/config';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';

export const indexDocument = async (filePath: string) => {
    const loader = new PDFLoader(filePath);

    // Load document
    const docs = await loader.load();

    // Chunk the document (optional)
    const chunkSize = 1000;
    const chunkedDocs = docs.flatMap(doc => {
        const chunks = [];
        let docText = doc.pageContent;
        for (let i = 0; i < docText.length; i += chunkSize) {
            chunks.push({
                pageContent: docText.substring(i, i + chunkSize),
                metadata: doc.metadata,
            });
        }
        return chunks;
    });

    const embeddings = new OpenAIEmbeddings({
        model: 'text-embedding-3-large', // Choose your model here
    });

    const vectorStore = await QdrantVectorStore.fromDocuments(chunkedDocs, embeddings, {
        url: 'http://localhost:6333', // Your Qdrant instance URL
        collectionName: 'ragger', // Collection name in Qdrant
    });
};
