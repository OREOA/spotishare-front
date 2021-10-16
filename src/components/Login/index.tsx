import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import Logo from '../Logo'

import styles from './login.module.scss'

const SpotifyLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M10.989 0C5.16556 0 0.439575 4.47984 0.439575 10C0.439575 15.5202 5.16556 20 10.989 20C16.8125 20 21.5385 15.5202 21.5385 10C21.5385 4.47984 16.8125 0 10.989 0ZM15.2726 14.7137C15.094 14.7137 14.9834 14.6613 14.8175 14.5685C12.1631 13.0524 9.07481 12.9879 6.02483 13.5806C5.85893 13.621 5.64199 13.6855 5.51863 13.6855C5.10601 13.6855 4.84652 13.375 4.84652 13.0484C4.84652 12.6331 5.10601 12.4355 5.42504 12.371C8.90891 11.6411 12.4694 11.7056 15.5066 13.4274C15.7661 13.5847 15.9192 13.7258 15.9192 14.0927C15.9192 14.4597 15.6172 14.7137 15.2726 14.7137ZM16.4169 12.0685C16.1957 12.0685 16.0468 11.9758 15.8937 11.8992C13.235 10.4073 9.27049 9.80645 5.74408 10.7137C5.53989 10.7661 5.4293 10.8185 5.23787 10.8185C4.78272 10.8185 4.41263 10.4677 4.41263 10.0363C4.41263 9.60484 4.63383 9.31855 5.07198 9.20161C6.25453 8.8871 7.46262 8.65323 9.2322 8.65323C11.9929 8.65323 14.6601 9.30242 16.7614 10.4879C17.106 10.6815 17.2421 10.9315 17.2421 11.2823C17.2379 11.7177 16.8806 12.0685 16.4169 12.0685ZM17.7356 8.99597C17.5144 8.99597 17.3783 8.94355 17.1868 8.83871C14.1581 7.125 8.74301 6.71371 5.23787 7.64113C5.08474 7.68145 4.89332 7.74597 4.68913 7.74597C4.12763 7.74597 3.69799 7.33065 3.69799 6.79435C3.69799 6.24597 4.05531 5.93548 4.43816 5.83065C5.9355 5.41532 7.6115 5.21774 9.43639 5.21774C12.5417 5.21774 15.7958 5.83065 18.1737 7.14516C18.5055 7.32661 18.7225 7.57661 18.7225 8.05645C18.7225 8.60484 18.2545 8.99597 17.7356 8.99597Z"
            fill="white"
        />
    </svg>
)

const Login: React.FC<{ redirect: string }> = ({ redirect }) => (
    <div
        style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Container className={styles.container}>
            <div className={styles.logoContainer}>
                <Logo />
            </div>
            <Row>
                <Col xs={5}>
                    <div className={styles.slogan}>The party at your fingertips</div>
                </Col>
            </Row>
            <div className={styles.loginContainer}>
                <a href={`${process.env.REACT_APP_API_URL}/login?redirectUrl=${redirect}`}>
                    <button className={styles.loginButton}>
                        <SpotifyLogo className={styles.spotifyLogo} />
                        Login with Spotify
                    </button>
                </a>
            </div>
        </Container>
    </div>
)

export default Login
