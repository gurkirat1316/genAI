import Card from "../components/Card";

const Home = () => {
    return (
        <>
            <div className="bg-gray-600 w-full h-screen">
                <div className="text-center p-4 bg-cyan-600 font-bold">
                    <p className="text-4xl mb-2">Welcome to personaApp</p>
                    <p className="text-2xl">Here you can chat with AI personas</p>
                </div>
                <div>
                    <Card />
                </div>
            </div>
        </>
    );
}

export default Home;