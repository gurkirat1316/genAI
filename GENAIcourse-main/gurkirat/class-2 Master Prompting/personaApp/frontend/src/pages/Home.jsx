import Card from "../components/Card";
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpg";
import Persona from "../components/Persona";
import { useState } from "react";

const Home = () => {
    const [selectedPersona, setSelectedPersona] = useState(null);
    if (selectedPersona) {
        return (
            <Persona
                personaKey={selectedPersona}
                goBack={() => setSelectedPersona(null)}
            />
        );
    }

    return (
        <div className="bg-gray-600 min-h-screen w-full flex flex-col">
            <header className="text-center p-6 bg-cyan-600 font-bold text-white">
                <p className="text-4xl mb-2">Welcome to personaApp</p>
                <p className="text-2xl">Here you can chat with AI personas</p>
            </header>

            <main className="flex flex-wrap justify-center gap-4 p-8">
                <Card
                    name="Muskan Kanojia"
                    designation="Software Engineer"
                    image={avatar1}
                    onClick={() => setSelectedPersona("muskan")}
                />
                <Card
                    name="Hitesh Choudary"
                    designation="Edtech, Entrepreneur, Software Engineer"
                    image={avatar2}
                    onClick={() => setSelectedPersona("hitesh")}
                />
                <Card
                    name="Piyush"
                    designation="Edtech, Software Engineer"
                    image={avatar2}
                    onClick={() => setSelectedPersona("piyush")}
                />
            </main>
        </div>
    );
};

export default Home;
