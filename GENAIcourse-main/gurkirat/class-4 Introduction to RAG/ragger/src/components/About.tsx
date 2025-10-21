import React from 'react';
import { CardHoverEffectDemo } from './AboutCard';
import Foot from './Foot';

const AboutInfo: React.FC = () => {
    return (
        <>
            <div className="text-center my-16 px-4">
                <p className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                    Ragger
                </p>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Power users, teams, and organizations, upgrade to Pro for the most capable AI research
                    and thinking partner.
                </p>
            </div>
            <div>
                <p className="text-2xl md:text-2x max-w-3xl mx-auto leading-relaxed text-center">Unlock premium features</p>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 p-6 bg-white mx-32">
                    <div className="flex-1 rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 bg-white hover:shadow-md transition">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">NotebookLM</h2>
                        <p className="text-blue-600 text-sm font-medium mb-6">
                            Free for individuals to get started
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✔</span>
                                Built with the latest Gemini models
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✔</span>
                                Upload PDFs, websites, Google Docs and Slides, YouTube URLs, and more
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✔</span>
                                Create one-click summaries, FAQs, timelines, and briefing docs
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✔</span>
                                Generate Audio Overviews and listen on-the-go
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1 rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8 bg-white relative overflow-hidden hover:shadow-xl transition">
                        <div className="absolute inset-0 bg-green-100 opacity-30 blur-3xl"></div>

                        <div className="relative">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                                NotebookLM in Pro
                            </h2>
                            <div className="bg-green-200 text-green-900 text-sm font-medium px-3 py-1 rounded-md inline-flex items-center mb-6">
                                ⚡ Everything in NotebookLM, plus the following:
                            </div>

                            <ul className="space-y-3 text-gray-700 relative">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✔</span>
                                    Get 5× more Audio and Video Overviews, notebooks, queries and more
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✔</span>
                                    Access to premium features
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✔</span>
                                    Create shared notebooks for your team and get usage analytics
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✔</span>
                                    Additional privacy and security
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20 text-center'>
                <p className='text-4xl'>How NotebookLM can work for you and your organization</p>
                <CardHoverEffectDemo />
            </div>
            <div>
                <Foot />
            </div>
        </>
    );
};

export default AboutInfo;
