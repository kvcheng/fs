const baseUrl = 'http://localhost:3001/anecdotes'

const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
}

const getAll = async () => {
  const response = await fetch(baseUrl)
  checkResponse(response)
  return response.json()
}

const createAnecdote = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: anecdote, votes: 0 })
  })

  checkResponse(response)
  return response.json()
}

const updateVotes = async (body, id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  checkResponse(response)
  return response.json()
}

export default { getAll, createAnecdote, updateVotes }
