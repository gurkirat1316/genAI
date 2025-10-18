import React from 'react';
import { AnimatedTestimonialsDemo } from './Testimonial';
import Foot from './Foot';


const Info: React.FC = () => {
    return (
        <>
            <div className="text-center p-5 mt-10 font-sans">
                <h1 className='text-6xl text-cyan-500'>Understand Anything</h1>
                <h4 className='text-2xl mt-5 mx-72'>Your research and thinking partner, grounded in the information you trust, built with the latest Gemini models.</h4>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Try Now</button>
            </div>
            <div className='mt-20'>
                <p className="text-4xl font-bold text-gray-800 text-center">Your AI-Powered Research Assistant</p>
                <div className="px-4 py-8 md:px-10 lg:px-20">
                    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-10">
                        <div className="flex flex-col items-start gap-4 md:w-1/2">
                            <div className="text-lg text-gray-600">
                                <p className="font-semibold text-xl mb-2">Heading</p>
                                <p>
                                    Upload PDFs, websites, YouTube videos, audio files, Google Docs,
                                    or Google Slides, and NotebookLM will summarize them and make
                                    interesting connections between topics, all powered by Gemini 2.0's
                                    multimodal understanding capabilities.
                                </p>
                            </div>
                        </div>
                        <div className="bg-red-500 w-full h-80 md:w-1/2 rounded-lg flex justify-center items-center">
                            <img
                                src="/path/to/your/image.png"
                                alt="Research Image"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-10">
                        <div className="flex flex-col items-start gap-4 md:w-1/2">
                            <div className="text-lg text-gray-600">
                                <p className="font-semibold text-xl mb-2">Heading</p>
                                <p>
                                    Upload PDFs, websites, YouTube videos, audio files, Google Docs,
                                    or Google Slides, and NotebookLM will summarize them and make
                                    interesting connections between topics, all powered by Gemini 2.0's
                                    multimodal understanding capabilities.
                                </p>
                            </div>
                        </div>
                        <div className="bg-red-500 w-full h-80 md:w-1/2 rounded-lg flex justify-center items-center">
                            <img
                                src="/path/to/your/image.png"
                                alt="Research Image"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-10">
                        <div className="flex flex-col items-start gap-4 md:w-1/2">
                            <div className="text-lg text-gray-600">
                                <p className="font-semibold text-xl mb-2">Heading</p>
                                <p>
                                    Upload PDFs, websites, YouTube videos, audio files, Google Docs,
                                    or Google Slides, and NotebookLM will summarize them and make
                                    interesting connections between topics, all powered by Gemini 2.0's
                                    multimodal understanding capabilities.
                                </p>
                            </div>
                        </div>
                        <div className="bg-red-500 w-full h-80 md:w-1/2 rounded-lg flex justify-center items-center">
                            <img
                                src="/path/to/your/image.png"
                                alt="Research Image"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 mt-40 p-20">
                <p className="text-4xl mx-40 text-center">We value your privacy and do not use your personal data to train NotebookLM.</p>
                <p className="text-2xl mx-40 text-center mt-10">NotebookLM does not use your personal data, including your source uploads, queries, and the responses from the model for training.</p>
                <div className="bg-red-500 mt-10 w-full md:w-1/2 mx-auto h-80 rounded-lg flex justify-center items-center">
                    <img
                        src="/path/to/your/image.png"
                        alt="Research Image"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
            <div className="mt-20 p-10 md:p-20">
                <p className="text-4xl text-center font-bold text-gray-800">How people are using Ragger</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md">
                        <p className="text-xl font-semibold text-center text-gray-800 mb-4">
                            Power study
                        </p>
                        <p className="text-gray-600 text-center mb-4">
                            Upload lecture recordings, textbook chapters, and research papers. Ask NotebookLM to explain complex concepts in simple terms, provide real-world examples, and reinforce your understanding.
                        </p>
                        <p className="text-indigo-600 font-semibold text-center">
                            Learn faster and deeper
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md">
                        <p className="text-xl font-semibold text-center text-gray-800 mb-4">
                            Organize your thinking
                        </p>
                        <p className="text-gray-600 text-center mb-4">
                            Upload your source material and let NotebookLM create a polished presentation outline, complete with key talking points and supporting evidence.
                        </p>
                        <p className="text-indigo-600 font-semibold text-center">
                            Present with confidence
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md">
                        <p className="text-xl font-semibold text-center text-gray-800 mb-4">
                            Spark new ideas
                        </p>
                        <p className="text-gray-600 text-center mb-4">
                            Upload brainstorming notes, market research, and competitor research. Ask NotebookLM to identify trends, generate new product ideas, and uncover hidden opportunities.
                        </p>
                        <p className="text-indigo-600 font-semibold text-center">
                            Unlock your creative potential
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-10 md:p-20 mb-20">
                <p className="text-4xl text-center font-bold text-gray-800">What are people saying</p>
                <AnimatedTestimonialsDemo />
            </div>
            <div>
                <Foot />
            </div>
        </>
    );
};

export default Info;
