import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const SearchResultsContainer = styled.div`
    table tr td:first-child,
    table tr th:first-child {
      border-left: 1;
    }
    table tr td:last-child,
    table tr th:last-child {
      border-right: 1;
    }
    th{
        color: #b3b3b3;
        padding: 1em 0 1em 0;
    }
    td{
        color: white;
        padding: 1em;
        border: 1px solid #535353;
    }
    .selected {
        background-color: #535353;
  
    }
`


const Index = (props) => {
    return (
        <SearchResultsContainer>
            <span className={'title'}>Osumat</span>
            {/*  <div className={'section-title-row'}>
                <span>Artisti</span>
                <span className={'last-section'}>Laulun nimi</span>
            </div>*/}
            {/* <div className={`song-row ${key === 0 ? 'first-child' : ''}`}>
                <span className={'artist-name'}>{song.album.artists[0].name}</span>
                <span className={'song-name'}>{song.name}</span>
            </div>*/}
            <table>
                <tbody>
                <tr>
                    <th>Artisti</th>
                    <th>Laulun nimi</th>
                </tr>
                {props.results.map((song, key) => (
                    <tr
                        key={key}
                        className={classnames({
                            'selected': song.uri === props.selectedSong,
                        })}
                    >
                        <td>{song.album.artists[0].name}</td>
                        <td onClick={() => props.submitSong(song.uri)}>{song.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </SearchResultsContainer>
    )
}

export default Index