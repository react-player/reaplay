import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ConvertTimeToText } from './helper'

interface Props {
  tracks: string[]
  startIndex?: number
  children?: any
}
// prop types should be like this interface

/**
 * Reaplay
 * @param {string[]} tracks
 * @param {number} startIndex
 * @param {any} children
 * @property {object}  player
 * @property {function} player.Logger
 * @property {boolean}  player.isLoading
 * @property {boolean}  player.isHaveError
 * @property {number}  player.trackIndex
 * @property {number}  player.duration
 * @property {string}  player.durationText
 * @property {number}  player.trackProgress
 * @property {string}  player.trackProgressText
 * @property {string}  player.trackStyling
 * @property {function}  player.onScrub
 * @property {function}  player.onScrubEnd
 * @property {boolean}  player.isPlaying
 * @property {function}  player.setIsPlaying
 * @property {function}  player.toNextTrack
 * @property {function}  player.toPrevTrack
 * @property {boolean}  player.isRepeat
 * @property {function}  player.setIsRepeat
 * @property {number}  player.volume
 * @property {function}  player.setVolume
 * @property {boolean}  player.isStopPlayMoreSong
 * @property {function}  player.StopPlayMoreSong
 * @property {function}  player.ShufflePlay
 * @property {boolean}  player.isShuffleList
 * @property {function}  player.setIsShuffleList
 * @property {boolean}  player.isMute
 * @property {function}  player.setIsMute
 * @property {number | string}  player.buffered
 * @property {string}  player.bufferedText
 * @property {function}  player.forward
 * @property {function}  player.backward
 */
export const Reaplay = ({ tracks, startIndex = 0, children }: Props) => {
  
  if(startIndex < 0 || startIndex > tracks.length){
    startIndex = 0;
  }
  // handle the undifind index
  // -----------------------------------------------
 
  /**
   * here manage states
   * use state because react need update with state if you change something
   *
   * @category states
   */

  // State
  const [trackIndex, setTrackIndex] = useState<number>(startIndex)
  // index of the tracks array on play

  const [trackProgress, setTrackProgress] = useState<number>(0)
  // played progress

  const [volume, setVolume] = useState<number>(100)
  // volume of the playing song

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  // play - puase

  const [isRepeat, setIsRepeat] = useState<boolean>(false)
  // repeat the playing song

  const [isStopPlayMoreSong, StopPlayMoreSong] = useState<boolean>(false)
  // if the song come on end, stop and dont play more

  const [isShuffleList, setIsShuffleList] = useState<boolean>(false)
  // shuffle list do anything ranodm, next - prev - on done

  const [isMute, setIsMute] = useState<boolean>(false)
  //  control the player mute, unmute

  const [buffered, setBuffered] = useState<number>(0)
  //  control the player mute, unmute

  const [fourceRepeat, setFourceRepeat] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isHaveError, setIsHaveError] = useState<boolean>(false)
  // helper states

  // =====================================================

  // --------
  // *
  // *
  // *
  // ---------------------------
  /**
   * here manage audio
   * here i use js Audio class and ref for manage audio props and functions
   *
   */
  const audioRef = useRef(new Audio(tracks[trackIndex]))
  audioRef.current.volume = volume / 100
  audioRef.current.muted = isMute

  audioRef.current.onloadeddata = () => setIsLoading(false)
  audioRef.current.onerror = () => setIsHaveError(true)

  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null)
  const isReady = useRef(false)
  // ---------------------------
  // *
  // *
  // *
  // --------

  // =============================
  // Destructure for conciseness

  // song duration
  const { duration } = audioRef.current

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%'
  const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `
  // ==============================




  // ==== Timer
  /**
   * change scrub value
   * @function
   * @description start the timing of song and detect when the song to ended
   */

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (!isStopPlayMoreSong) {
          if (isShuffleList) {
            ShufflePlay()
          } else {
            if (isRepeat) {
              setFourceRepeat((prev) => prev + 1)
            } else {
              toNextTrack()
            }
          }
        }
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, 1000)
  }




  /**
   * change scrub value
   * @function
   * @param {number} value - The value for set on scrub
   * @description set the scrub value on changing time
   *
   * on scrub get the slider or range tag value and replace it with playing song progress
   */

  const onScrub = (value: number) => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  }

  // -----------




  /**
   * change scrub value
   * @function
   * @description set the scrub value on key or click
   * @summary optional function
   *
   * this optional function
   */

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }





  /**
   * go to prev song
   * @function
   * @description go prev song at tracks list
   *
   * if shuffle play is on (true) the prev song do random
   * if its first song, play at last song in tracks list
   */

  const toPrevTrack = () => {
    if (isShuffleList) {
      ShufflePlay()
    } else {
      if (trackIndex - 1 < 0) {
        setTrackIndex(tracks.length - 1)
      } else {
        setTrackIndex(trackIndex - 1)
      }
    }
  }




  /**
   * go to next song
   * @function
   * @description go next song at tracks list
   *
   * if shuffle play is on (true) the next song do random
   * if the last song, come at first song on tracks list
   */

  const toNextTrack = () => {
    if (isShuffleList) {
      ShufflePlay()
    } else {
      if (trackIndex < tracks.length - 1) {
        setTrackIndex(trackIndex + 1)
      } else {
        setTrackIndex(0)
      }
    }
  }




  /**
 * forward
 * @function
 * @description forward to 5s later of playing song
 */

  const forward = () => {
    audioRef.current.currentTime += 5;
  }



  /**
 * backward
 * @function
 * @description backward to 5s before of Track progress 
 */

  const backward = () => {
    audioRef.current.currentTime -= 5;
  }




  /**
   * shuffle play
   * @function
   * @description play a random song in tracks list
   *
   * get a random index from tracks length and play it
   */

  const ShufflePlay = () => {
    let songsLength: number = tracks.length - 1
    let random: number = Math.floor(Math.random() * songsLength)
    setTrackIndex(random)
  }




  /**
   * manage isPlay state for play or pause the song
   * start timer for detect when the song ended or more ..
   */

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])





  /**
   * manage the buffered value of playing song
   */
  useEffect(() => {
    if(duration > 0) {
      let i;
      for(i = 0; i < audioRef.current.buffered.length; i++) {
        setBuffered((audioRef.current.buffered.end(audioRef.current.buffered.length - 1 - i) / duration) * 100)
      }
    }
  }, [trackProgress])



  /**
   * manage track index and repeat time
   * if track index changed, here be call ... and it change the audio ref src
   * if fource update be called, it do anything at first
   */

  useLayoutEffect(() => {
    audioRef.current.pause()
    setIsLoading(true)
    setBuffered(0);

    audioRef.current = new Audio(tracks[trackIndex])
    setTrackProgress(audioRef.current.currentTime)
    audioRef.current.onloadeddata = () => setIsLoading(false)

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true
    }
  }, [trackIndex, fourceRepeat])





  /**
   * clean the memory and pause the song for manage memory leak and
   */
  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [])





  /**
   * Logger
   * @function
   * @description get player state
   *
   * if some time you need get player states seconds by seconds can use it.
   */

  const Logger = () => {
    console.log({
      trackIndex,
      duration: ConvertTimeToText(duration),
      trackProgress: ConvertTimeToText(trackProgress),
      isPlaying,
      isRepeat,
      isShuffleList,
      isStopPlayMoreSong,
      volume,
      isLoading,
      isHaveError
    })
  }



  
  // *****************
  // *********
  // **
  // ==============  return data
  const data = {
    Logger, // log the states
    isLoading, // loading state
    isHaveError, // error state
    trackIndex, // playing index at tracks list
    duration, // playing song duration
    durationText: ConvertTimeToText(audioRef.current.duration), // playing song duration by minutes and : spliter
    trackProgress, // how much song played
    trackProgressText: ConvertTimeToText(trackProgress), // how much song played by minutes and : spliter
    trackStyling, // random style generated
    onScrub, // on scrub function for change track progress
    onScrubEnd,
    isPlaying, // playing state
    setIsPlaying, // playing state setter
    toNextTrack, // play next song function
    toPrevTrack, // play prevent song function
    isRepeat, // repeat state
    setIsRepeat, // set repeat state
    volume, // volume state
    setVolume, // set volume state
    isStopPlayMoreSong, // stop play more song at song ended
    StopPlayMoreSong, // set stop play more song
    ShufflePlay, // play a random song at list function
    isShuffleList, // shuffle list state
    setIsShuffleList, // set shuffle list mode,
    isMute, // the player is mute
    setIsMute, // set player to mute or unmute
    buffered, // the buffered value of the song
    bufferedText: `${buffered}%`,
    backward, // forward to 5s
    forward // backward to 5s
  }

  return children({
    ...data
  })
}
