import React from 'react'
import classNames from 'classnames'

import styles from './progress.module.scss'

type ProgressProps = {
    progress: number,
    className?: string
}

const Progress: React.FC<ProgressProps> = ({ progress = 0, className }) => (
    <div className={classNames(styles.container, className)}>
        <div
            className={styles.progress}
            style={{
                width: `${100 * progress}%`
            }}
        />
    </div>
)

export default Progress
