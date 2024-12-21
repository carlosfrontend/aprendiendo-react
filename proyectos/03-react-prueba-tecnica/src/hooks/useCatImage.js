import { useState, useEffect } from 'react'

const useCatImage = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState()
  useEffect(() => {
    if (!fact) return
    const firstThreeWords = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${firstThreeWords}?fontSize=18&fontColor=red&type=square`)
      .then(res => {
        const { url } = res
        setImageUrl(url)
      })
  }, [fact])
  return { imageUrl }
}

export default useCatImage
