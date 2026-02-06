import { useDispatch, useSelector } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
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
    const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    return (
        <ul>
            {anecdotes.map(anecdote => (
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(updateVotes(anecdote.id))}
                />
                    ))}
        </ul>
    )
}

export default AnecdoteList