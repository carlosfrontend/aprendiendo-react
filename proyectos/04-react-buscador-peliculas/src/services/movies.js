const API_KEY = import.meta.env.VITE_API_KEY

export const searchMovies = async ({ search }) => {
  if (search === '') return null
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
    const json = await response.json()
    const movies = json.Search
    return movies?.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
      image: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
