import React, { useState, useContext, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import SongList from '../../SongList'

import styles from './search.module.scss'
import { sendSong, searchSong } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'
import { Song } from '../../../types/song'
import { Container } from 'reactstrap'

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

    const search = useMemo(
        () =>
            throttle((text: string) => {
                if (session) {
                    searchSong(text, session.hash).then(setSearchResults)
                }
            }, 100),
        [session, setSearchResults]
    )

    const onChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const text = e.currentTarget.value
            setValue(text)
            if (text) {
                search(text)
            } else {
                setSearchResults([])
            }
        },
        [search, setSearchResults]
    )

    const onSongClick = useCallback(
        (song: Song) => {
            if (session) {
                sendSong(song.songId, session.hash).then(() => {
                    setValue('')
                    setSearchResults([])
                    onClose()
                })
            }
        },
        [session, onClose]
    )

    return (
        <React.Fragment>
            <Container
                className={classNames(styles.container, className, {
                    [styles.active]: isOpen
                })}
            >
                <input
                    value={value}
                    onFocus={onOpen}
                    className={styles.input}
                    onChange={onChange}
                    placeholder="Search for a song"
                />
            </Container>
            <Container
                className={classNames(styles.searchResultContainer, {
                    [styles.active]: isOpen
                })}
            >
                <SongList songs={searchResults} onSongClick={onSongClick} />
            </Container>
        </React.Fragment>
    )
}

export default React.memo(Search)
