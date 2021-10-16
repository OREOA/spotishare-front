import React from 'react'
import styles from './loader.module.scss'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Loader = () => {
    return (
        <div className={styles.container}>
            <ScaleLoader color="#b21ed7" />
        </div>
    )
}

export default Loader
