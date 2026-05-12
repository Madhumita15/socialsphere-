import { ElementType } from "react"

export type VariableSpeed = {
  min: number
  max: number
}

export type TextTypeProps = {
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: string
  cursorClassName?: string
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: VariableSpeed
  onSentenceComplete?: (text: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
}
