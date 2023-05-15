/* {
		"name": "Eric",
		"occupation": "Dungeon Master",
		"debt": true,
		"weapon": "The Mighty Pen"
	} */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [debt, setDebt] = useState(false)
  const [weapon, setWeapon] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    console.log('submit')
    const payload = {
      name,
      occupation,
      debt,
      weapon,
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.status === 201) {
        console.log('All good')
        const newCharacter = await response.json()
        // Navigate to the details page
        navigate(`/details/${newCharacter.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Create</h1>
      <form
        style={{ display: 'grid', gridTemplate: 'repeat(5, 1fr) / auto' }}
        onSubmit={handleSubmit}
      >
        <label>
          Name:
          <input
            value={name}
            onChange={event => {
              setName(event.target.value)
            }}
          />
        </label>
        <label>
          Occupation:
          <input
            value={occupation}
            onChange={event => {
              setOccupation(event.target.value)
            }}
          />
        </label>
        <label>
          Debt:
          <input
            type='checkbox'
            checked={debt}
            onChange={event => {
              setDebt(event.target.checked)
            }}
          />
        </label>
        <label>
          Weapon:
          <input
            value={weapon}
            onChange={event => {
              setWeapon(event.target.value)
            }}
          />
        </label>
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default CreatePage
