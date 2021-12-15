import React from 'react'

import { Reaplay } from 'reaplay'

import { songs as songsFromUri } from './Links.json'

const songsFromLocal: string[] = [
  require('./songs/song1.mp3'),
  require('./songs/song2.mp3'),
  require('./songs/song3.mp3'),
  require('./songs/song4.mp3'),
  require('./songs/song5.mp3'),
  require('./songs/song6.mp3')
]
// you need use ( require ) because react will hash the file names !!!

// ===============================================================
const App = () => {
  console.log(songsFromUri)
  console.log(songsFromLocal)
  console.log(metadata)

  return (
    <Reaplay tracks={songsFromUri} startIndex={4}>
      {(player: any) => {
        console.log(player);

        return (
          <>
            <div className='audio-player'>
              
            </div>
          </>
        )
      }}
    </Reaplay>
  )
}

export default App

// ===============================================================
const metadata = [
  {
    name: 'Song 1',
    artist: 'artist 1',
    album: 'album 1'
  },
  {
    name: 'Song 2',
    artist: 'artist 2',
    album: 'album 2'
  },
  {
    name: 'Song 3',
    artist: 'artist 3',
    album: 'album 3'
  },
  {
    name: 'Song 4',
    artist: 'artist 4',
    album: 'album 4'
  },
  {
    name: 'Song 5',
    artist: 'artist 5',
    album: 'album 5'
  },
  {
    name: 'Song 6',
    artist: 'artist 6',
    album: 'album 6'
  }
]
