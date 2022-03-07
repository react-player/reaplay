# reaplay

> the react HOC for create custom players with any styles you like <br />
> give me your tracks, i will give you the all function and variable you need to create a player

[![NPM](https://img.shields.io/npm/v/reaplay.svg)](https://www.npmjs.com/package/reaplay)
[![License](https://img.shields.io/npm/l/reaplay.svg)](LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Installation

```
npm install --save reaplay
```

```
yarn add reaplay
```

Also be sure you have `react` and `react-dom` installed in your app



## Usage

### jsx
```jsx
import React from 'react';

import { Reaplay } from 'reaplay'

const songList = [
  "songSrc", // url song
  "songSrc", // url song
   require("./songSrc"), //local song
]

//                         optional ↓
<Reaplay tracks={songList} startIndex={3} >
      {(player) => {
          // player have functions and variables
      }
</Reaplay>
```

### tsx
```tsx
import React from 'react';

import { Reaplay } from 'reaplay'

const songList:string[] = [
  "songSrc", // url song
  "songSrc", // url song
   require("./songSrc"), //local song
]

<Reaplay tracks={songList} >
      {(player: any) => {
          // player have functions and variables
      }
</Reaplay>
```

## Example
See the example directory for a basic working example of using this project.  To run it locally, run `npm install` in the [example directory](https://github.com/Amir-Alipour/reaplay/tree/master/example) and then `npm start`.

or <br />
[![Edit blog](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/blissful-frost-yl38y)

<br/>
<br/>

### Props - HOC Parametrs
Param | Type | Default | Notes
--- | --- | --- | ---
`tracks` | String Array | null | it's the main param, the required param for "reaplay" working
`startIndex` | Number | 0 | use it for start at custom index of your tracks array
`children` | Any | Null | ---

<br/>
<br/>

## player props :

### Props - properties
Prop | Type | Default | Notes
--- | --- | --- | ---
`isLoading` | Boolean | false | if use Uri tracks, you need wait for the uri will be load
`isHaveError` | Boolean | false | use it for start at custom index of your tracks array
`trackIndex` | Number | 0 | the playing index of the tracks array
`duration` | Number | song duration | the duration of the playing song
`durationText` | String | song duration converted | the duration of the playing song converted to 00:00 string
`trackProgress` | Number | played duration | the duration of the played of song
`trackStyling` | string | --- | the generated style of track progress
`isPlaying` | Boolean | false | the player on playing or not
`isRepeat` | Boolean | false | the player on `Repeat` the song mode or not
`volume` | Number | 100 | the player volume. <br/> `0` to `100`
`speed` | Number | 1 | the player playbackRate. <br/> `0.5` or `1` or `2`
`isStopPlayMoreSong` | Boolean | false | if the song will be end, dont play more anything
`isShuffleList` | Boolean | false | if shuffleList will be true, any action do random </br> (next, prev, ended)
`isMute` | Boolean | false | the player mute status
`buffered` | Number | 0 | the buffered value of the song <br/> `0` to `100`
`bufferedText` | String | 0 | the buffered value of the song <br/> `0%` to `100%`

### Props - Events
Event | param | Description | Example
--- | --- | --- | ---
`Logger` | () | the Logger, console.log the properties seconds by seconds for debug or your testing | player.Logger()
`onScrub` |<pre>(value: number)</pre>| for change track progress on custom duration | `onChange`={(e) => player.onScrub(e.target.value)}
`onScrubEnd` | () | `optional` -- use it on keyUp or ... on your (slider, range, any custom player duration controller) | `onMouseUp`={player.onScrubEnd} <br /> `onKeyUp`={player.onScrubEnd}
`setIsPlaying` | (isPlaying: boolean) | for play or pause the song, use it. | `onClick`={() => player.setIsPlaying((isPlay) => !isPlay)}
`setTrackIndex` | () | for change handly playing index. | `onClick`={() => player.setTrackIndex(5)}
`toNextTrack` | () | go to next track of the tracks list | player.toNextTrack()
`toPrevTrack` | () | go to prev track of the tracks list | player.toPrevTrack()
`setIsRepeat` | (isRepeat: boolean) | turn on or off for repeat the playing song | player.setIsRepeat((isRepeat) => !isRepeat)
`setVolume` | (volume: number) | set player volume, `0` to `100` | player.setVolume(70)
`playSlow` | () | set player playbackRate (speed) to `0.5` | player.playSlow()
`playNormal` | () | set player playbackRate (speed) to `1` | player.playNormal()
`playFast` | () | set player playbackRate (speed) to `2` | player.playFast()
`StopPlayMoreSong` | (stopped: boolean) | dont play more anything after the playing song will be ended | player.StopPlayMoreSong(true)
`ShufflePlay` | () | play a random track of your tracks list | player.ShufflePlay()
`setIsShuffleList` | (shuffle: boolean) | the all player action will be random </br> `next` `prev` `ended` | player.setIsShuffleList((isShuffle) => !isShuffle)
`setIsMute` | (mute: boolean) | mute or umute the player | player.setIsMute((isMute) => !isMute)
`forward` | () | forward to 5s later | player.forward()
`backward` | () | backward to 5s before | player.backward()

</br>
</br>
</br>

## Dependency
> Reaplay <b> don't </b>  have 3rd party library dependency. <br/>
> just use vanilla js and react functionalites

## License

MIT © [amir-alipour](https://github.com/amir-alipour) - [LICENSE](https://github.com/Amir-Alipour/reaplay/blob/master/LICENSE)
