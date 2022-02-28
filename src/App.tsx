import { useState, useEffect } from 'react'
import type { Resonse, Result } from './types'
import './App.css'
import { motion, AnimatePresence } from 'framer-motion'

type FilterProps = {
  popular: Result[]
  setFiltered: React.Dispatch<React.SetStateAction<Result[]>>
  activeGenre: number
  setActiveGenre: React.Dispatch<React.SetStateAction<number>>
}

const Filter = ({
  popular,
  setFiltered,
  activeGenre,
  setActiveGenre,
}: FilterProps) => {
  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(popular)
      return
    }
    const filtered = popular.filter((movie) =>
      movie.genre_ids.includes(activeGenre)
    )

    setFiltered(filtered)
  }, [activeGenre])

  return (
    <div className="filter-container">
      <button
        className={activeGenre === 0 ? 'active' : ''}
        onClick={() => setActiveGenre(0)}
      >
        All
      </button>
      <button
        className={activeGenre === 35 ? 'active' : ''}
        onClick={() => setActiveGenre(35)}
      >
        Comedy
      </button>
      <button
        className={activeGenre === 28 ? 'active' : ''}
        onClick={() => setActiveGenre(28)}
      >
        Action
      </button>
    </div>
  )
}

type MovieProps = {
  movie: Result
}

const Movie = ({ movie }: MovieProps) => {
  return (
    <motion.div
      layout
      className="movie"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2>{movie.original_title}</h2>
      <img
        src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}
        alt=""
      />
    </motion.div>
  )
}

function App() {
  const [popular, setPopular] = useState<Resonse['results']>([])
  const [filtered, setFiltered] = useState<Resonse['results']>([])
  const [activeGenre, setActiveGenre] = useState(0)

  const fetchPopular = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=907960292d4625afadb2f77f2174e557&language=en-US&page=1'
    )
    const moveies = await data.json()
    setPopular(moveies.results)
    setFiltered(moveies.results)
  }

  useEffect(() => {
    fetchPopular()
  }, [])

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <AnimatePresence>
        <motion.div className="popular-movies">
          {filtered &&
            filtered.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
