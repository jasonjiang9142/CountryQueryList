import React, { useState } from "react";
import Nav from "../components/nav";
import Country from "../components/country";

export default function Home() {
    const [selectedLanguage, setSelectedLanguage] = useState("english");
    const [languageInput, setLanguageInput] = useState("");

    const handleLanguageSubmit = (e) => {
        e.preventDefault();
        setSelectedLanguage(languageInput);
        setLanguageInput('')
    };

    return (
        <div>

            <form onSubmit={handleLanguageSubmit} className="m-2 flex justify-center align-center">
                <label className="p-2">
                    Select Language:
                    <input
                        placeholder="English"
                        type="text"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        className="p-2 border border-gray-400 rounded-lg"

                    />
                </label>
                <button className="p-2 border border-gray-400 rounded-lg" type="submit">Set Language</button>
            </form>

            <Country language={selectedLanguage} />
        </div>
    );
}
