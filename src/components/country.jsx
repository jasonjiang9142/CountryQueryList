import React, { useState, useEffect } from "react";
import IndividualCountry from "./individualcountry";

export default function Country({ language = 'english' }) {
    const [countryData, setCountryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state

    useEffect(() => {
        const getData = async () => {
            try {
                const rawdata = await fetch(`https://restcountries.com/v3.1/lang/${language}`);
                const jsondata = await rawdata.json();
                setCountryData(jsondata);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        getData();
    }, [language]);

    const handleSearch = (e) => {
        // Update the search query state as the user types
        setSearchQuery(e.target.value);
    };

    // Filter the countryData based on the search query
    const filteredCountries = countryData.filter((country) => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : (
                <div>
                    <div className="flex justify-center p-3">
                        <input
                            type="text"
                            placeholder="Search for a country"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="p-2 border border-gray-400 rounded-lg "

                        />
                    </div>

                    <div className="grid grid-cols-3">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <div className="m-4" key={country.cca3}>
                                    <IndividualCountry country={country} />
                                </div>
                            ))
                        ) : (
                            <p>No matching countries</p>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}