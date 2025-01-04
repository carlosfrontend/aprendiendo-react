import PropTypes from 'prop-types'

function ListOfMovies ({ movies }) {
  return (
    <ul>
      {
      movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))
}
    </ul>
  )
}

function NoMoviesResults () {
  return (
    <p>No se encontraron peliculas para esta búsqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}

Movies.propTypes = {
  movies: PropTypes.array
}
ListOfMovies.propTypes = {
  movies: PropTypes.array
}
