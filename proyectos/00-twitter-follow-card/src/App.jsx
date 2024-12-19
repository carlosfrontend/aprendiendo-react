import { useState } from 'react'
import './styles/App.css'
import TwitterFollowCard from './TwitterFollowCard'
import OpenIcon from './icons/OpenIcon'
import CloseIcon from './icons/CloseIcon'

function App() {
  const [showMore, setShowMore] = useState(false)
  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const [avatars, setAvatars] = useState([
    {
      name: 'Monica Crauss',
      username: '@MonicaCrauss',
      imageId: 39,
      isFollowing: false
    },
    {
      name: 'Sarah Jhonson',
      username: '@SarahJhonson',
      imageId: 16,
      isFollowing: true
    },
    {
      name: 'Josseph Joestar',
      username: '@JossephJoestar',
      imageId: 52,
      isFollowing: false
    },
    {
      name: 'Shogun Lee',
      username: 'shogunlee',
      imageId: 25,
      isFollowing: true
    },
    {
      name: 'Mikasa Ackerman',
      username: '@MikasaAckerman',
      imageId: 12,
      isFollowing: false
    },
    {
      name: 'Naruto Uzumaki',
      username: '@NarutoUzumaki',
      imageId: 3,
      isFollowing: true
    }
  ])

  return (
    <>
      {showMore === false &&
        avatars
          .slice(0, 3)
          .map((avatar) => (
            <TwitterFollowCard
              key={avatar.username}
              avatar={avatar}
              {...avatar}
              avatars={avatars}
              setAvatars={setAvatars}
            />
          ))}
      {showMore === true &&
        avatars.map((avatar) => (
          <TwitterFollowCard
            key={avatar.username}
            avatar={avatar}
            {...avatar}
            avatars={avatars}
            setAvatars={setAvatars}
          />
        ))}
      <button onClick={handleShowMore} className='tw-followCard-showMore'>
        {showMore ? 'Mostrar menos' : 'Mostrar más'} {showMore ? <OpenIcon /> : <CloseIcon />}
      </button>
    </>
  )
}

export default App
