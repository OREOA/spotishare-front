import React from 'react'
import classNames from 'classnames'

import styles from './progress.module.scss'

const Progress = ({ progress, className }) => (
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
