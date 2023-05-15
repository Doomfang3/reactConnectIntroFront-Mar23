import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const DetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // Store the character somewhere
  const [character, setCharacter] = useState()

  // Fetch the character
  const fetchCharacter = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/characters/${id}`)
      if (response.status === 200) {
        const parsed = await response.json()
        setCharacter(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Call the fetch at the right time
  useEffect(() => {
    fetchCharacter()
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/characters/${id}`, {
        method: 'DELETE',
      })
      if (response.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return character ? (
    <>
      <h1>Details about {character.name}</h1>
      <p>{character.occupation}</p>
      <Link to={`/update/${id}`}>Update</Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </>
  ) : (
    <h1>Loading informations about your character</h1>
  )
}

export default DetailsPage
