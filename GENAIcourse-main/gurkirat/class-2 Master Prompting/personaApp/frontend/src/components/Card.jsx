import avatar1 from "../images/avatar1.jpg";

const Card = () => {
    return (
        <>
            <div className="ml-10 mt-20 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar1} alt="Bonnie image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</span>
                    <div className="flex mt-4 md:mt-6">
                        <a href="/persona" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Chat with AIBot</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;