import { ReactNode, useEffect, useRef, useState } from 'react'
import { ConvertTimeToText } from './helper'

interface Props {
  tracks: string[]
  startIndex?: number
  children?: ((props: PlayerType) => ReactNode) | ReactNode
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
 * @property {number}  player.setTrackIndex
 * @property {number}  player.duration
 * @property {string}  player.durationText
 * @property {number}  player.trackProgress
 * @property {string}  player.trackProgressText
 * @property {string}  player.trackStyling
 * @property {function}  player.onScrub
 * @property {function}  player.onScrubEnd
 * @property {boolean}  player.isPlaying
 * @property {function}  player.setIsPlaying
 * @property {function}  player.play
 * @property {function}  player.pause
 * @property {function}  player.toNextTrack
 * @property {function}  player.toPrevTrack
 * @property {boolean}  player.isRepeat
 * @property {function}  player.repeat
 * @property {number}  player.volume
 * @property {function}  player.setVolume
 * @property {number}  player.speed
 * @property {function}  player.playSlow
 * @property {function}  player.playNormal
 * @property {function}  player.playFast
 * @property {boolean}  player.isStopPlayMoreSong
 * @property {function}  player.StopPlayMoreSong
 * @property {boolean}  player.isShuffle
 * @property {function}  player.playShuffle
 * @property {function}  player.playRandom
 * @property {boolean}  player.isMute
 * @property {function}  player.mute
 * @property {function}  player.unmute
 * @property {number | string}  player.buffered
 * @property {string}  player.bufferedText
 * @property {function}  player.forward
 * @property {function}  player.backward
 * @property {function}  player.forceUpdatePlayer
 */
export const Reaplay = ({ tracks, startIndex = 0, children }: Props) => {
  if (startIndex < 0 || startIndex > tracks.length) {
    startIndex = 0
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

  const [speed, setSpeed] = useState<number>(1)
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


  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isHaveError, setIsHaveError] = useState<boolean>(false)
  const [forcePlayerUpdate, setForcePlayerUpdate] = useState<number>(0)
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
  audioRef.current.autoplay = false
  audioRef.current.volume = volume / 100
  audioRef.current.muted = isMute
  audioRef.current.playbackRate = speed

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
            playRandom()
          } else {
            if (isRepeat) {
              onScrub(0);
              audioRef.current.play();
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

  const onScrub = (value: number): void => {
    // Clear any timers already running
    clearInterval(intervalRef.current as NodeJS.Timeout)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  }

  // -----------

  /**
   * play song
   * @function
   * @description play the current song
   */

  const play = (): void => {
    setIsPlaying(true)
  }

  // -----------

  /**
   * pause song
   * @function
   * @description pause the current song
   */

  const pause = (): void => {
    setIsPlaying(false)
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

  const onScrubEnd = (): void => {
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

  const toPrevTrack = (): void => {
    if (isShuffleList) {
      playRandom()
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

  const toNextTrack = (): void => {
    if (isShuffleList) {
      playRandom()
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

  const forward = (): void => {
    audioRef.current.currentTime += 5
  }

  /**
   * backward
   * @function
   * @description backward to 5s before of Track progress
   */

  const backward = (): void => {
    audioRef.current.currentTime -= 5
  }

  /**
   * playSlow
   * @function
   * @description set the player speed to (0.5)
   */

  const playSlow = (): void => {
    setSpeed(0.5)
  }

  /**
   * playNormal
   * @function
   * @description set the player speed to normal mode, (1)
   */

  const playNormal = (): void => {
    setSpeed(1)
  }

  /**
   * playFast
   * @function
   * @description set player speed to (2), it be play 2x faster than normal mode
   */

  const playFast = (): void => {
    setSpeed(2)
  }

  /**
   * repeat
   * @function
   * @description set player to repeat current song
   */

  const repeat = (SetOnRepeat: boolean): void => {
    if (SetOnRepeat) {
      setIsRepeat(true)
    } else {
      setIsRepeat(false)
    }
  }

  /**
   * mute
   * @function
   * @description mute the player
   */

  const mute = (): void => {
    setIsMute(true)
  }

  /**
   * unmute
   * @function
   * @description unmute the player
   */

  const unmute = (): void => {
    setIsMute(false)
  }

  /**
   * shuffle play
   * @function
   * @description play a random song in tracks list
   *
   * get a random index from tracks length and play it
   */

  const playShuffle = (shuffle: boolean): void => {
    if (shuffle) {
      setIsShuffleList(true)
    } else {
      setIsShuffleList(false)
    }
  }

  const playRandom = (): void => {
    let songsLength: number = tracks.length - 1
    let random: number = Math.floor(Math.random() * songsLength)
    setTrackIndex(random)
  }

  const forceUpdatePlayer = (): void => {
    setForcePlayerUpdate((prev) => prev + 1)
  }

  const update = (): void => {
    onScrubEnd();
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
   * manage isRepeat update state for repeat the song
   */

  useEffect(() => {
    onScrubEnd();
  }, [isRepeat])

  /**
   * manage the buffered value of playing song
   */
  useEffect(() => {
    if (duration > 0) {
      let i
      for (i = 0; i < audioRef.current.buffered.length; i++) {
        setBuffered(
          (audioRef.current.buffered.end(
            audioRef.current.buffered.length - 1 - i
          ) /
            duration) *
            100
        )
      }
    }
  }, [trackProgress])

  /**
   * manage track index and repeat time
   * if track index changed, here be call ... and it change the audio ref src
   * if fource update be called, it do anything at first
   */

  useEffect(() => {
    audioRef.current.pause()
    setIsPlaying(false)
    setIsLoading(true)
    setBuffered(0)

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
  }, [trackIndex, forcePlayerUpdate])

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

  const Logger = (): void => {
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
      isHaveError,
      speed
    })
  }

  // *****************
  // *********
  // **
  // ==============  return data
  const data: PlayerType = {
    Logger, // log the states
    isLoading, // loading state
    isHaveError, // error state
    trackIndex, // playing index at tracks list
    setTrackIndex, // set playing index at tracks list
    duration, // playing song duration
    durationText: ConvertTimeToText(audioRef.current.duration), // playing song duration by minutes and : spliter
    trackProgress, // how much song played
    trackProgressText: ConvertTimeToText(trackProgress), // how much song played by minutes and : spliter
    trackStyling, // random style generated
    onScrub, // on scrub function for change track progress
    onScrubEnd,
    isPlaying, // playing state
    setIsPlaying, // playing state setter
    play, // play current song
    pause, // pause current song
    toNextTrack, // play next song function
    toPrevTrack, // play prevent song function
    isRepeat, // repeat state
    repeat, // set repeat state
    volume, // volume state
    setVolume, // set volume state
    isStopPlayMoreSong, // stop play more song at song ended
    StopPlayMoreSong, // set stop play more song
    playShuffle, // play a random song at list function
    isShuffle: isShuffleList, // is on shuffle or not
    playRandom, // play a random song
    isMute, // the player is mute
    mute, // set player to mute
    unmute, // set player to unmute
    buffered, // the buffered value of the song
    bufferedText: `${buffered}%`,
    backward, // forward to 5s
    forward, // backward to 5s
    speed, // the speed range, 0.5 or 1 or 2
    playSlow, // play slow playbackRate of track
    playNormal, // play normal playbackRate of track
    playFast, // play fast playbackRate of track
    forceUpdatePlayer, // force Re-Render Player
    update // update the player
  }

  // @ts-ignore
  return children({
    ...data
  })
}

export interface PlayerType {
  Logger: Function
  isLoading: boolean
  isHaveError: boolean
  trackIndex: number
  setTrackIndex: (index: number) => void
  duration: number
  durationText: string
  trackProgress: number
  trackProgressText: string
  trackStyling: string
  onScrub: Function
  onScrubEnd: Function
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  play: Function
  pause: Function
  toNextTrack: Function
  toPrevTrack: Function
  isRepeat: boolean
  repeat: (setOnrepeat: boolean) => void
  volume: number
  setVolume: (volume: number) => void
  speed: number
  playSlow: Function
  playNormal: Function
  playFast: Function
  isStopPlayMoreSong: boolean
  StopPlayMoreSong: Function
  playShuffle: (isShuffle: boolean) => void
  isShuffle: boolean
  playRandom: Function
  isMute: boolean
  mute: Function
  unmute: Function
  buffered: number | string
  bufferedText: string
  forward: Function
  backward: Function
  forceUpdatePlayer: Function
  update: Function
}
