import { useContext, useMemo } from 'react'
import { ChallengesContexts } from '../contexts/ChallengesContexts'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContexts)

  const percentToNextLevel = useMemo(() => {
    return Math.round((currentExperience / experienceToNextLevel) * 100)
  }, [currentExperience, experienceToNextLevel])

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}