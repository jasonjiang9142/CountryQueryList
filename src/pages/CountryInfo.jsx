import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function CountryInfo() {

    const fetchCountryName = useParams();
    const countryName = fetchCountryName.Country

    const [nativeName, setNativeName] = useState('')

    const [country, setCountry] = useState({})
    const [name, setName] = useState('')
    const [flagUrl, setFlagUrl] = useState('')
    const [capital, setCapital] = useState('')
    const [continent, setContinent] = useState('')
    const [population, setPopulation] = useState(0)

    const [subRegion, setSubRegion] = useState('')
    const [currency, setCurrency] = useState('')
    const [languages, setLanguages] = useState('')




    useEffect(() => {
        const getData = async () => {
            try {
                const rawdata = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
                const jsondata = await rawdata.json()
                setCountry(jsondata[0])
                console.log(country)

            }
            catch (e) {
                console.error(e)

            }
        }

        getData()

    }, [])

    useEffect(() => {
        console.log(country)

        const getInfo = () => {
            try {
                setName(country.name.official)
                setFlagUrl(country.flags.png)
                setCapital(country.capital[0])
                setContinent(country.continents[0])
                setSubRegion(country.subregion)
                setNativeName(country.name.common)
            }
            catch (e) {
                console.error(e)
            }
        }

        const getPopulation = () => {
            try {
                const getpopulation = country.population
                const formattedPopulation = getpopulation.toLocaleString()
                setPopulation(formattedPopulation)

            } catch (e) {
                console.error(e)
            }

        }

        const getCurrencies = () => {
            try {
                const currencies = country.currencies;
                console.log(currencies);
                console.log('hi')
                const mappedData = Object.keys(currencies).map((currencyCode) => {

                    const { name } = currencies[currencyCode];

                    return `${name} `
                });

                const mycurrency = mappedData

                setCurrency(mycurrency)

                    ;
            } catch (e) {
                console.error(e);
            }
        }

        const getLanguages = () => {
            try {
                if (!country || !country.languages) {
                    console.error('Invalid country object or languages not found.');
                    return;
                }

                const languages = country.languages;
                const languageNames = Object.values(languages); // Get an array of language names
                const languageString = languageNames.join(', '); // Join the names with a comma and space


                setLanguages(languageString)


            } catch (e) {
                console.error(e);
            }
        };





        getInfo()
        getPopulation()
        getCurrencies()
        getLanguages()

    }, [country])

    return (

        <div className="flex justify-center items-center h-screen mx-4">

            <div className='m-4m grid grid-cols-3'>
                <div className='flex flex-col items-center'>

                    <img src={flagUrl} alt="" className="rounded-xl shadow-lg" />
                    <button className="mt-4 bg-white-500 px-4 py-2 border rounded-xl border-black">
                        <a href="/" className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>Back</a>
                    </button>
                </div>



                <div className="col-span-2 text-center">
                    <h1 className="font-bold text-xl">{name}</h1>
                    <h1 className="italic  pt-1">{nativeName}</h1>

                    <div className="grid grid-cols-2 m-4">
                        <div className="p-2 text-left ">
                            <span className="font-bold ">Capital: </span>{capital}
                            <br />
                            <span className="font-bold ">Region: </span>{continent}
                            <br />
                            <span className="font-bold ">Population: </span>{population}



                        </div>

                        <div className="p-2 text-left ">
                            <span className="font-bold ">Sub-region: </span>{subRegion}
                            <br />
                            <span className="font-bold ">Currency: </span>{currency}
                            <br />
                            <span className="font-bold ">Languages: </span>{languages}

                        </div>
                    </div>

                    <div>
                        <img src="" alt="" />
                    </div>


                </div>
            </div>

        </div >
    )
}