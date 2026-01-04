import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import RoomCard from './components/RoomCard'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RoomCard 
      roomName="Les Duplex"
      minPax={1}
      maxPax={6}
      price="800 000"
      imagePath="/src/assets/couverture-bungalow-double.webp"
    />
  </React.StrictMode>,
)