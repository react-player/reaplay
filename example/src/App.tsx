import './App.css'
import React from 'react'
import { Reaplay, PlayerType } from 'reaplay'

// import { songs as songsFromUri } from './Links.json'

const songsFromLocal: string[] = [
  require('./songs/song1.mp3'),
  require('./songs/song2.mp3'),
  require('./songs/song3.mp3'),
  require('./songs/song4.mp3'),
  require('./songs/song5.mp3')
]
// if you use local songs,
// you need use ( require ) because react will hash the file names !!!

// ===============================================================
const App = () => {
  return (
    <Reaplay tracks={songsFromLocal} startIndex={2}>
      {(player: PlayerType) => {
        return (
          <>
            <div className='audio-player'>
              <h1 className='track-name'>{metadata[player.trackIndex].name}</h1>
              <h3 className='track-artist'>
                {metadata[player.trackIndex].artist}
              </h3>
              <p className='track-album'>{metadata[player.trackIndex].album}</p>

              <div className='track-progress'>
                <p>{player.trackProgressText}</p>
                <input
                  type='range'
                  value={player.trackProgress}
                  step='1'
                  min='0'
                  max={player.duration ? player.duration : `${player.duration}`}
                  className='progress'
                  onChange={(e) => player.onScrub(e.target.value)}
                  onMouseUp={(e) => player.onScrubEnd(e)}
                  onKeyUp={(e) => player.onScrubEnd(e)}
                />
                <p>{player.durationText}</p>
              </div>

              <div className='track-actions'>
                <button onClick={() => player.toPrevTrack()}>prev</button>
                <button
                  onClick={() =>
                    player.setIsPlaying((isPlay: boolean) => !isPlay)
                  }
                >
                  {player.isPlaying ? 'pause' : 'play'}
                </button>
                <button onClick={() => player.toNextTrack()}>next</button>
                <button
                  onClick={() =>
                    player.setIsRepeat((isRepeat: boolean) => !isRepeat)
                  }
                >
                  {player.isRepeat ? 'un repeat' : 'repeat'}
                </button>
              </div>

              <div className='track-volume'>
                <p>{player.volume}</p>
                <input
                  type='range'
                  value={player.volume}
                  step='1'
                  min='0'
                  max='100'
                  onChange={(e) => player.setVolume(e.target.value)}
                  className='volume-range'
                />
                <button
                  onClick={() => player.setIsMute((isMute: boolean) => !isMute)}
                  style={{ padding: '5px' }}
                >
                  {player.isMute ? 'unmute' : 'mute'}
                </button>
              </div>
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
