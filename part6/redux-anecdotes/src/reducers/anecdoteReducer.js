import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => (a.id !== updated.id ? a : updated))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions
export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVotes = (id) => {
  return async (dispatch, getState) => {
    // Needed to use getState() instead of state.find since we cannot access state directly
    const { anecdotes } = getState()
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)

    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const res = await anecdotesService.updateVotes(updatedAnecdote, id)
    dispatch(voteAnecdote(res))
  }
}

export default anecdoteSlice.reducer
