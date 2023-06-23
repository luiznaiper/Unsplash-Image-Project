import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const searchValue = (form.elements.namedItem('search') as HTMLInputElement)
      ?.value
    if (!searchValue) return
    setSearchTerm(searchValue)
  }
  return (
    <section>
      <h1 className="title">Unsplash Luis Project</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="dog"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
