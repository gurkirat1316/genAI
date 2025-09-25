const Card = (props) => {
    return (
        <div
            onClick={props.onClick}
            className="ml-10 mt-20 w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer"
        >
            <div className="flex justify-end px-2 pt-2"></div>
            <div className="flex flex-col items-center pb-10">
                <img
                    className="w-16 h-16 rounded-full shadow-lg"
                    src={props.image}
                    alt={`${props.name} image`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {props.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {props.designation}
                </span>
                <div className="flex mt-4 md:mt-6">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // prevent bubbling if the whole card also has onClick
                            props.onClick();
                        }}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Chat with {props.name}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
