import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Reaplay } from './index';

const links = [
  "https://audio-previews.elements.envatousercontent.com/files/281404327/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22GBUXGY3-is-it-hip-hop.mp3%22",
  "https://audio-previews.elements.envatousercontent.com/files/222944645/preview.mp3?response-content-disposition=attachment%3B+filename%3D%2247ASMTR-beautiful-drum-bass.mp3%22",
  "https://audio-previews.elements.envatousercontent.com/files/273664943/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22S5ZSHTQ-trendy-hip-hop.mp3%22",
  "https://audio-previews.elements.envatousercontent.com/files/311585865/preview.mp3?response-content-disposition=attachment%3B+filename%3D%228SJTBL7-bass-drums.mp3%22",
  "https://audio-previews.elements.envatousercontent.com/files/277345330/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22PM7VCQX-soft-hip-hop.mp3%22",
  "https://audio-previews.elements.envatousercontent.com/files/276996949/preview.mp3?response-content-disposition=attachment%3B+filename%3D%222FUE6LX-a-drum-bass.mp3%22",
  "https://audio-previews.elements.envatousercontent.com/files/337692843/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22UQXN53F-lofi-hip-hop.mp3%22",
]
// ------------------

beforeAll(() => {
  window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.play = () => new Promise<void>(() => { /* do nothing */ });
  window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
})

afterEach(cleanup);

describe('Reaplay', () => {
  it('is truthy', () => {
    expect(Reaplay).toBeTruthy()
  })
  it("isLoading to be true Test", () => {
    render(
      <Reaplay tracks={links} >
        {(player: any) => {
          expect(player.isLoading).toBe(true)
          return null;
        }}
      </Reaplay>
    )
  })
  it("isHaveError Test", () => {
    render(
      <Reaplay tracks={['sadklfjlkasdfkljlk']}>
        {(player: any) => {
          setTimeout(() => {
            expect(player.isHaveError).toBe(true)
          }, 100)
          return null;
        }}
      </Reaplay>
    )
  })
  it("isHaveError Test", () => {
    render(
      <Reaplay tracks={['sadklfjlkasdfkljlk']}>
        {(player: any) => {
          setTimeout(() => {
            expect(player.isHaveError).toBe(true)
          }, 100)
          return null;
        }}
      </Reaplay>
    )
  })
  it("trackIndex Test", () => {
    render(
      <Reaplay tracks={links} startIndex={2}>
        {(player: any) => {
          expect(player.trackIndex).toBe(2)
          return null;
        }}
      </Reaplay>
    )
  })
  it("initial isPlaying Test", () => {
    render(
      <Reaplay tracks={links}>
        {(player: any) => {
          expect(player.isPlaying).toBe(false)
          return null;
        }}
      </Reaplay>
    )
  })
  it("initial isRepeat Test", () => {
    render(
      <Reaplay tracks={links}>
        {(player: any) => {
          expect(player.isRepeat).toBe(false)
          return null;
        }}
      </Reaplay>
    )
  })
  it("initial volume Test", () => {
    render(
      <Reaplay tracks={links}>
        {(player: any) => {
          expect(player.volume).toBe(100)
          return null;
        }}
      </Reaplay>
    )
  })
  it("initial isMute Test", () => {
    render(
      <Reaplay tracks={links}>
        {(player: any) => {
          expect(player.isMute).toBe(false)
          return null;
        }}
      </Reaplay>
    )
  })
})
