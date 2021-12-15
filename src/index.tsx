import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {ConvertTimeToText} from './helper'

interface Props {
  text: string
}

export const Reaplay = ({ text }: Props) => {
  return <div >Example Component: {text}</div>
}
