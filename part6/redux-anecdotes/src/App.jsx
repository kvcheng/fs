// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { updateVotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  // const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
  // const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      {/* {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(updateVotes(anecdote.id))}>vote</button>
          </div>
        </div>
      ))} */}
      <h2>Create New Anecdote: </h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
