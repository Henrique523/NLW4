import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ChallengesContexts } from "./ChallengesContexts";

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountDown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContexts)
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = useMemo(() => {
    return Math.floor(time / 60)
  }, [time])

  const seconds = useMemo(() => {
    return time % 60
  }, [time])
  
  const startCountDown = useCallback(() => {
    setIsActive(true)
  }, [])

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
    setHasFinished(false)
  }, [])

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{ minutes, seconds, hasFinished, isActive, startCountDown, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  )
}
