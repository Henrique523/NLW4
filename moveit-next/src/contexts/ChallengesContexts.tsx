import { createContext, useCallback, useState, ReactNode, useMemo } from 'react'
import challenges from '../../challenges.json'


interface ChallengesProviderProps {
  children: ReactNode
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  activeChallenge: Challenge
  experienceToNextLevel: number
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
}


export const ChallengesContexts = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(32)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level + 1) * 4, 2)
  }, [level])

  const levelUp = useCallback(() => {
    setLevel(value => value + 1)
  }, [])
  
  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }, [])

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null)
  }, [])

  return (
    <ChallengesContexts.Provider value={{ 
      level,
      levelUp,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel
    }}>
      {children}
    </ChallengesContexts.Provider>
  )
}