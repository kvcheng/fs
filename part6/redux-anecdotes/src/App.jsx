import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesFilter from './components/AnecdotesFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      Filter: <AnecdotesFilter />
      <AnecdoteList />
      <h2>Create New Anecdote: </h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
