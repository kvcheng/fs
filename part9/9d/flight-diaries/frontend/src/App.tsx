import { useEffect, useState } from 'react'
import type { Diary } from './types/types'
import { createDiary, getAllDiaries } from './services/diaryService'

function App() {
    const [diaries, setDiaries] = useState<Diary[]>([])
    const [date, setDate] = useState('')
    const [weather, setWeather] = useState('')
    const [visibility, setVisibility] = useState('')
    const [comment, setComment] = useState('')

    const [notification, setNotification] = useState('')

    useEffect(() => {
        getAllDiaries().then((data) => {
        setDiaries(data)
        })
    }, [])

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            const newDiary = await createDiary({ date, weather, visibility, comment })
            setDiaries(diaries.concat(newDiary))
            setDate('')
            setWeather('')
            setVisibility('')
            setComment('')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                setNotification(error.message)
                setTimeout(() => {
                    setNotification('')
                }, 5000)
            } else {
                console.log("An unknown error occurred")
            }
        }
    }
    return (
        <>
        {notification}
        <form onSubmit={diaryCreation}>
            <input type='date' value={date} onChange={(event) => setDate(event.target.value)} />
            <div>
                <input type='radio' name='weather' value='sunny' onChange={() => setWeather('sunny')} /> Sunny
                <input type='radio' name='weather' value='cloudy' onChange={() => setWeather('cloudy')} /> Cloudy
                <input type='radio' name='weather' value='stormy' onChange={() => setWeather('stormy')} /> Stormy
                <input type='radio' name='weather' value='windy' onChange={() => setWeather('windy')} /> Windy
                <input type='radio' name='weather' value='rainy' onChange={() => setWeather('rainy')} /> Rainy
            </div>
            <div>
                <input type='radio' name='visibility' value='great' onChange={() => setVisibility('great')} /> Great
                <input type='radio' name='visibility' value='good' onChange={() => setVisibility('good')} /> Good
                <input type='radio' name='visibility' value='ok' onChange={() => setVisibility('ok')} /> Ok
                <input type='radio' name='visibility' value='poor' onChange={() => setVisibility('poor')} /> Poor
            </div>
            <div>
                <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} placeholder='Comment' />
            </div>
            <button type='submit'>Add</button>
        </form>
        {diaries.map(diary => (
            <div key={diary.id}>
                <h3>{diary.date}</h3>
                <p>Weather: {diary.weather}</p>
                <p>Visibility: {diary.visibility}</p>
                <p>Comment: {diary.comment}</p>
            </div>
        ))}
        </>
    )
}

export default App
