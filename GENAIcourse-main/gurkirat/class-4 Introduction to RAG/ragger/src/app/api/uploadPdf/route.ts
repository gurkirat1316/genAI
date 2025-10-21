import { promises as fs } from 'fs';
import path from 'path';
import { indexDocument } from '@/lib/indexing';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);

    await fs.writeFile(filePath, buffer);

    await indexDocument(filePath);

    return Response.json({ message: 'File uploaded and indexed successfully!' });
  } catch (error: any) {
    return Response.json(
      { message: 'Error during upload', error: error.message },
      { status: 500 }
    );
  }
}
