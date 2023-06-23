import React from 'react'

const SearchForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const searchValue = (form.elements.namedItem('search') as HTMLInputElement)
      ?.value
    if (!searchValue) return
    console.log(searchValue)
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
