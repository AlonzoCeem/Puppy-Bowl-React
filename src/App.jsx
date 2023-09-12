import { useState, useEffect } from 'react'
import { Link, Routes, Route, useParams } from 'react-router-dom'
import axios from 'axios'

const Players = ({ players })=> {
  return (
    <div>
      {
        players.map((player)=> {
          return (
            <div key={player.id}>
              <Link to={`/players/${player.id}`}>
                <h2>{player.name}</h2>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

const Player = ({ players })=> {
  const params = useParams()
  const id = params.id*1

  const player = players.find( player => player.id === id*1)
  if(!player){
    return null
  }
  return (
    <div>
      <h1>Name: {player.name}</h1>
      <h1>Breed: {player.breed}</h1>
      <h1>Status: {player.status}</h1>
      <img src={player.imageUrl}/>
    </div>
  )
}

function App() {
  const [players, setPlayers] = useState([])
  
  useEffect(()=> {
    async function getData() {
      const {data} = await axios.get('https://fsa-puppy-bowl.herokuapp.com/api/2307/players')
      setPlayers(data.data.players)
    }
    getData()
  }, [])

  return (
    <>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/players">Players</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Puppy Bowl!</h1>}/>
          <Route path="/players" element={<Players players={players}/>}/>
          <Route path="/players/:id" element={<Player players={players}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
