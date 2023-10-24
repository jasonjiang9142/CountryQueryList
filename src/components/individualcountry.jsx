import { useEffect, useState } from "react"
import CountryInfo from "../pages/CountryInfo"
import { Link } from "react-router-dom"


export default function IndividualCountry({ country }) {
    const [name, setName] = useState('')
    const [flagUrl, setFlagUrl] = useState('')
    const [capital, setCapital] = useState('')
    const [continent, setContinent] = useState('')
    const [population, setPopulation] = useState(0)
    const [linkName, setLinkName] = useState('')




    useEffect(() => {
        const getData = () => {
            try {
                setName(country.name.official)
                setFlagUrl(country.flags.png)
                setCapital(country.capital[0])
                setContinent(country.continents[0])

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

        const getLinkName = () => {
            try {
                const getName = (country.name.common)
                setLinkName(getName)


            } catch (e) {
                console.error(e)
            }
        }

        getData()
        getPopulation()
        getLinkName()

    }, [country])


    return (
        <div>
            <div className='bg-white shadow-md rounded-xl p-4 ' >
                <div className="flex justify-center" >
                    <img src={flagUrl} alt="" className="rounded-xl shadow-lg" />
                </div>
                <div className="text-center mt-4">
                    <h1 className="text-xl font-semibold mb-4 ">
                        {name}
                    </h1>

                    <p>
                        <span className="font-bold ">Capital: </span>{capital}
                        <br />
                        <span className="font-bold ">Region: </span>{continent}
                        <br />
                        <span className="font-bold ">Population: </span>{population}

                    </p>

                    <div className="mt-3">
                        <Link to={`/CountryInfo/${linkName}`} className="underline italic ">
                            View Full Information
                        </Link>
                    </div>
                </div>

            </div>
        </div >
    )
}