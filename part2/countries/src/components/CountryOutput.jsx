import axios from 'axios'
import { useState } from 'react'

const CountryOutput = ({ output }) => {
    const [name, setName] = useState('')
    const [detailedCountry, setDetailedCountry] = useState(null)

    const getDetailedCountry = (commonName) => {
        if (commonName !== name) {
            setName(commonName)
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${commonName}`)
                .then(res => {
                    setDetailedCountry(res.data)
                }
            )
        }
    }

    if (output.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (output.length == 1) {
        getDetailedCountry(output[0].name.common)
        if (detailedCountry){
            const languages = Object.values(detailedCountry.languages)
            return (
                <div>
                    <h1>{detailedCountry.name.common}</h1>
                    <p>
                        Capital: {detailedCountry.capital}<br></br>
                        Area: {detailedCountry.area}
                    </p>
                    <h2>Languages</h2>
                    <ul>
                        {languages.map((language, index) => (
                            <li key={index}>{language}</li>
                        ))}
                    </ul>
                    <img src={detailedCountry.flags.png}></img>
                </div>
            )
        }
    }
    return (
        output.map(country => (
            <li key={country.name.common}>
                {country.name.common}
            </li>
        ))
    )
}

export default CountryOutput