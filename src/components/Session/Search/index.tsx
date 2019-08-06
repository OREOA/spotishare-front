import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import SongList from '../../SongList'

import styles from './search.module.scss'
import { sendSong, searchSong } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'
import { Song } from '../../../types/song'

interface SearchProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    className?: string
}

const Search: React.FC<SearchProps> = ({ isOpen, onOpen, onClose, className }) => {
    const { session } = useContext(SpotishareContext)

    const [value, setValue] = useState('')
    const [searchResults, setSearchResults] = useState<Song[]>([])

    const search = throttle((text: string) => {
        if (session) {
            searchSong(text, session.hash).then(setSearchResults)
        }
    }, 100)

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const text = e.currentTarget.value
        setValue(text)
        if (text) {
            search(text)
        } else {
            setSearchResults([])
        }
    }

    const onSongClick = (song: Song): void => {
        if (session) {
            sendSong(song.id, session.hash).then(() => {
                setValue('')
                setSearchResults([])
                onClose()
            })
        }
    }

    const onFocus = (): void => {
        onOpen()
    }

    return (
        <div
            className={classNames(styles.searchContainer, className, {
                [styles.active]: isOpen
            })}
        >
            <input
                value={value}
                onFocus={onFocus}
                className={styles.input}
                onChange={onChange}
                placeholder="Search for a song"
            />
            <div className={styles.searchResultContainer}>
                <SongList songs={searchResults} onSongClick={onSongClick} />
            </div>
        </div>
    )
}

export default React.memo(Search)
