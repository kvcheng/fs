import { useDispatch, useSelector } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    // Use both selectors, first applying the filter and then sorting in descending order of votes
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filtered = filter
            ? anecdotes.filter(a =>
                a.content.toLowerCase().includes(filter.toLowerCase())
            )
            : anecdotes

        return [...filtered].sort((a, b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()

    const handleVotes = (content, id) => {
        dispatch(updateVotes(id))
        dispatch(setNotification(`You voted for '${content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
    
    return (
        <ul>
            {anecdotes.map(anecdote => (
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVotes(anecdote.content, anecdote.id)}
                />
                    ))}
        </ul>
    )
}

export default AnecdoteList