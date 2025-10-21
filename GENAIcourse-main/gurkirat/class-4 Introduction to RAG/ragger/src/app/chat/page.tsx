"use client"

import Navbar from "@/components/Navbar";
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });

export default function Chat() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <Navbar />
            <div className="w-screen h-screen flex flex-col">
                <div className="flex flex-1">
                    <div className="flex-none basis-[25%] bg-red-100">
                        <div className="flex justify-center mt-5">
                            <button
                                type="button"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 me-2 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:cursor-pointer"
                                onClick={handleOpenModal}
                            >
                                + Add New Source
                            </button>
                        </div>
                        <div>Sources</div>
                    </div>
                    <div className="flex-none basis-[35%] bg-red-400">summary</div>
                    <div className="flex-none basis-[40%] bg-red-50">
                        chat
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}
