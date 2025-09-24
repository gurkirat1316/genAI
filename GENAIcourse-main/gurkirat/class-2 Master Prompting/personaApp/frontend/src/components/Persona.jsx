import { useState } from "react";
import { getModelResponse } from '../api';
import { PERSONA_PROMPT } from "../persona";

const Persona = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi, How can i help you today ?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const PERSONA = JSON.stringify(PERSONA_PROMPT);

    const handleSend = async () => {
        if (input.trim() === '') {
            return;
        }
        const userMessage = input.trim();
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const reply = await getModelResponse(PERSONA, userMessage);
            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong !!' }]);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <div className="w-full max-w-xl bg-white shadow-lg rounded-lg flex flex-col p-4 space-y-4">
                    <h1 className="text-2xl font-bold text-center text-indigo-600">Persona Chat</h1>

                    <div className="flex-1 h-96 overflow-y-auto space-y-2 border border-gray-200 p-2 rounded">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md ${msg.role === 'assistant'
                                        ? 'bg-indigo-100 text-left self-start max-w-[70%]'
                                        : 'bg-green-100 text-right self-end ml-auto max-w-[70%]'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !loading) handleSend();
                            }}
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-300"
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Persona;