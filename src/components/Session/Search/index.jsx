import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import SongList from '../../SongList'

import styles from './search.module.scss'
import { sendSong, searchSong } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'

const Search = ({ isOpen, onOpen, onClose, className }) => {
    const { session: { hash } } = useContext(SpotishareContext)

    const [value, setValue] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const search = throttle((text) => {
        searchSong(text, hash)
            .then(setSearchResults)
    }, 100)

    const onChange = (e) => {
        const text = e.target.value
        setValue(text)
        if (text) {
            search(text)
        } else {
            setSearchResults([])
        }
    }

    const onSongClick = (song) => {
        sendSong(song.id, hash)
            .then(() => {
                setValue('')
                setSearchResults([])
                onClose()
            })
    }

    const onFocus = () => {
        onOpen()
    }

    return (
        <div className={classNames(styles.searchContainer, className, {
            [styles.active]: isOpen,
        })}>
            <input
                value={value}
                onFocus={onFocus}
                className={styles.input}
                onChange={onChange}
                placeholder="Search for a song"
            />
            <div className={styles.searchResultContainer}>
                <SongList
                    songs={searchResults}
                    onSongClick={onSongClick}
                />
            </div>
        </div>
    )
}

export default Search
