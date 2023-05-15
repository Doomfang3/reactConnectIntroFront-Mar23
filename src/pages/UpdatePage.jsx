import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({ name: '', occupation: '', debt: false, weapon: '' })
  const [isLoading, setIsLoading] = useState(true)

  const fetchCharacter = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/characters/${id}`)
      const character = await response.json()
      delete character.id
      console.log(character)
      console.log(inputs)
      setInputs(character)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [id])

  const handleChange = event => {
    /* setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    })) */
    /* Condition ? iftrue : iffalse */
    setInputs(prevInputs => {
      let currentValue = event.target.value
      const currentTarget = event.target.name

      if (event.target.type === 'checkbox') {
        currentValue = event.target.checked
        console.log(event.target.checked)
      }

      return { ...prevInputs, [currentTarget]: currentValue }
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { ...inputs }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/characters/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.status === 200) {
        console.log('All good')
        // Navigate to the details page
        navigate(`/details/${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>Update {id}</h1>
      <form
        style={{ display: 'grid', gridTemplate: 'repeat(5, 1fr) / auto' }}
        onSubmit={handleSubmit}
      >
        <label>
          Name:
          <input value={inputs.name} name='name' onChange={handleChange} />
        </label>
        <label>
          Occupation:
          <input value={inputs.occupation} name='occupation' onChange={handleChange} />
        </label>
        <label>
          Debt:
          <input type='checkbox' name='debt' checked={inputs.debt} onChange={handleChange} />
        </label>
        <label>
          Weapon:
          <input value={inputs.weapon} name='weapon' onChange={handleChange} />
        </label>
        <button type='submit'>Edit</button>
      </form>
    </>
  )
}

export default UpdatePage
