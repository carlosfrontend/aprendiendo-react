import './App.css'
import debounce from 'just-debounce-it'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numero')
      return
    }
    if (search.length < 3) {
      setError('No se puede buscar una pelicula con menos de 3 letras')
      return
    }
    setError(null)
  }, [search])
  return { search, updateSearch }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
    console.log('search', search)
    getMovies({ search })
    
  },300)
  , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            style={{
              border: '1px solid transparent',
              boderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} type='text' name='query' id='query' placeholder='Avengers, Star Wars, The Matrix ...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>

        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}

      </main>
    </div>
  )
}

export default App
