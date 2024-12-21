import useCatFact from './hooks/useCatFact'
import useCatImage from './hooks/useCatImage'
import './App.css'

const App = () => {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }
  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        <button onClick={handleClick}>Get new fact</button>
        <aside>
          {fact && <p>{fact}</p>}
          {imageUrl && <img src={imageUrl} alt={`A cat image with the words "${fact}" inside`} />}
        </aside>
      </section>
    </main>
  )
}

export default App
