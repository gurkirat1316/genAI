"use client"

import { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFileUploaded?: (fileName: string) => void; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onFileUploaded }) => {
    if (!isOpen) return null;

    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please upload a file.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/uploadPdf', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                alert("File uploaded and indexed successfully!");
                onFileUploaded?.(file.name);
                onClose();
            } else {
                alert(data.message || "Error during file upload");
            }
        } catch (error) {
            alert("Error during file upload in catch");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-1/2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Source</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-md font-medium text-gray-700" htmlFor="text">Paste Text</label>
                        <textarea
                            id="text"
                            rows={3}
                            className="w-full p-4 mt-2 text-md rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste content here..."
                        />
                        <button
                            type="button"
                            className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 hover:cursor-pointer"
                        >
                            Add Text Source
                        </button>
                    </div>

                    {/* Website URL Section */}
                    <div className="mb-6">
                        <label className="block text-md font-medium text-gray-700" htmlFor="url">From Website</label>
                        <input
                            id="url"
                            type="url"
                            className="w-full p-2 mt-2 text-md rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter website URL"
                        />
                        <button
                            type="button"
                            className="w-full mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 hover:cursor-pointer"
                        >
                            Fetch from URL
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-md font-medium text-gray-700" htmlFor="file">Upload Document</label>
                        <input
                            id="file"
                            type="file"
                            accept=".pdf"
                            className="w-full p-2 mt-2 text-md rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        />
                        <button
                            type="button"
                            onClick={handleFileUpload}
                            className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 hover:cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload PDF File'}
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
