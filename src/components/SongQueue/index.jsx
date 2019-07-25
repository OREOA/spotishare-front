import React from 'react'
import styled from 'styled-components'

const QueueContainer = styled.div`
    min-width: 25em;
    min-height: 10em;
    margin-top: 2em;
    background-color: #212121;
    border: 1px solid #1db954;
    .title {
        display: block;
        margin-top: 1em;
        color: white;
        margin-bottom: 1em;
    }
    
    .section-title-row {
        width: 100%;
        margin: auto;
        height: 1em;
        padding: 1em 0 1em 0;
        span {
            color: #b3b3b3;
        }
    }
    
    .song-row {
        text-align: center;
        margin: auto;
        min-height: 1em;
        padding: 1em;
        color: white;
        .artist-name{
            display: table-cell;
            height: auto;
            width:48%;
            display: inline-block;
            border: 1px solid red;
        }
        .song-name{
            display: table-cell;
            width:48%;
            display: inline-block;
            border: 1px solid red;
        }
     
    }
    .first-child {
        border-top: 1px solid #535353;
    }
    margin-bottom: 2em;
    table{
        width: 100%;
        border-collapse: collapse;
    }
    table tr td:first-child,
    table tr th:first-child {
      border-left: 0;
    }
    table tr td:last-child,
    table tr th:last-child {
      border-right: 0;
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
    
`


const Index = (props) => {
    return (
        <QueueContainer>
            <span className={'title'}>Biisilista</span>
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
                {props.songList.map((song, key) => (
                    <tr key={key}>
                        <td>{song.album.artists[0].name}</td>
                        <td>{song.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </QueueContainer>
    )
}

export default Index