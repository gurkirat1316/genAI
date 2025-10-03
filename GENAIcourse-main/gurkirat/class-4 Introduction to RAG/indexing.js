import 'dotenv/config'
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';

async function init() {
    const filePath = "./react-beginners-handbook.pdf";
    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    // if you want to do according to chunk size then do this else directly do embedding
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
        model: 'text-embedding-3-large',
    });

    const vectorStore = await QdrantVectorStore.fromDocuments(chunkedDocs, embeddings, {
        url: 'http://localhost:6333',
        collectionName: 'chaicode-collection',
    });

    console.log('Indexing of documents done...');
}

init();