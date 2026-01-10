const Persons = ({ persons, filter, onDelete }) => {
  return (
      persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => (
        <li key={person.name}>
          {person.name} {person.number} 
          <button onClick={() => onDelete(person.name, person.id)}>delete</button>
          </li>

    )))
}

export default Persons