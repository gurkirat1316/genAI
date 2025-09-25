import { useState, useRef, useEffect } from "react";
import { getModelResponse } from '../api';
import { MUSKAN_PERSONA } from "../personas/muskanpersona";
import { HITESH_PERSONA } from "../personas/hiteshpersona";
import { PIYUSH_PERSONA } from "../personas/piyushpersona";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const Persona = ({ personaKey, goBack }) => {
    let currentPersona;
    switch (personaKey) {
        case "muskan":
            currentPersona = MUSKAN_PERSONA;
            break;
        case "hitesh":
            currentPersona = HITESH_PERSONA;
            break;
        case "piyush":
            currentPersona = PIYUSH_PERSONA;
            break;
        default:
            currentPersona = MUSKAN_PERSONA;
    }

    // Define welcome messages for each persona
    const welcomeMessages = {
        muskan: 'Kida fe, ki haal aa tera, mein teri apni Muskan das fe aj ki kriye ki puchna tu mere toh ?',
        hitesh: 'Hey there! I am Hitesh, your friendly Edtech entrepreneur and software engineer. How can I assist you today?',
        piyush: 'Hello! Piyush here, ready to chat and help you with anything related to Edtech and software engineering!',
    };

    // Initialize messages with persona specific welcome message
    const [messages, setMessages] = useState([
        { role: 'assistant', content: welcomeMessages[personaKey] || welcomeMessages.muskan }
    ]);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const PERSONA = JSON.stringify(currentPersona);
    const chatRef = useRef(null);

    // Reset messages when personaKey changes
    useEffect(() => {
        setMessages([{ role: 'assistant', content: welcomeMessages[personaKey] || welcomeMessages.muskan }]);
        setInput('');
    }, [personaKey]);

    // const handleSend = async () => {
    //     if (input.trim() === '') {
    //         return;
    //     }

    //     const userMessage = input.trim();

    //     // Add user message to chat
    //     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    //     setInput(''); // Clear input field
    //     setLoading(true); // Show loading indicator

    //     try {
    //         // Fetch assistant's reply from API
    //         const reply = await getModelResponse(PERSONA, userMessage);
    //         // Add assistant's reply to chat
    //         setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    //     } catch (error) {
    //         // Handle errors gracefully
    //         setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong !!' }]);
    //     } finally {
    //         setLoading(false); // Stop loading indicator
    //     }
    // };


    const handleSend = async () => {
        if (input.trim() === '') {
            return;
        }

        const userMessage = input.trim();

        // Build updated message list including new user message
        const updatedMessages = [...messages, { role: 'user', content: userMessage }];

        // Update UI immediately
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            // Build the full conversation for the API: system prompt + chat history
            const fullConversation = [
                { role: 'system', content: PERSONA },
                ...updatedMessages
            ];

            // Send full conversation to API (must send entire messages array)
            const reply = await getModelResponse(fullConversation);

            // Append assistant reply to messages
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (error) {
            console.error("Error in handleSend:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong !!' }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Scroll to bottom whenever messages change
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <button
                onClick={goBack}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 self-start"
            >
                ← Back to Personas
            </button>

            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg flex flex-col p-4 space-y-6">
                <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">Persona Chat</h1>

                <div
                    className="flex-1 h-96 overflow-y-auto space-y-4 border border-gray-200 p-4 rounded prose max-w-full"
                    ref={chatRef}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-md text-md ${msg.role === "assistant"
                                ? "bg-indigo-100 text-left self-start max-w-full"
                                : "bg-green-100 text-right self-end ml-auto max-w-1/2"
                                }`}
                        >
                            <ReactMarkdown
                                children={msg.content}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                            />
                        </div>
                    ))}
                    {loading && <div className="text-gray-500 italic text-md">Typing...</div>}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
                        <textarea
                            rows={1}
                            style={{ maxHeight: "140px", overflowY: "auto" }}
                            className="w-full resize-none outline-none text-sm leading-relaxed placeholder-gray-500"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                e.target.style.height = "auto";
                                const maxHeight = 140;
                                if (e.target.scrollHeight < maxHeight) {
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                } else {
                                    e.target.style.height = `${maxHeight}px`;
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey && !loading) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 text-sm font-medium"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Persona;
