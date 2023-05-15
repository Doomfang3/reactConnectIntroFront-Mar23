import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  // Storing the data
  const [characters, setCharacters] = useState([])

  // Fetch Data
  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/characters`)
      console.log(response)
      if (response.status === 200) {
        const parsed = await response.json()
        setCharacters(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Timing of fetching the data
  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <>
      <h1>All characters</h1>
      {characters.map(character => (
        <h3 key={character.id}>
          <Link to={`/details/${character.id}`}>{character.name}</Link>
        </h3>
      ))}
    </>
  )
}

export default HomePage
