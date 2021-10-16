# Spotishare frontend

live (mobile preferred): https://app.spotishare.live/

Backend: https://github.com/OREOA/spotishare-back


<img src=https://i.imgur.com/2wm0NwD.jpg width="35%"> <img align="top" src=https://i.imgur.com/e0V7yaT.jpg width="35%">


# Description

Spotishare (name to be changed) is a mobile-first full-stack web application, that can be used to collaboratively create & share Spotify sessions.

It’s an answer to a simple problem: you’re at a party and would like your favorite song to be played at some point, but you can’t find the person that is responsible for the music, or even if you do, letting everyone get their favorite songs in can be a hassle. With this app, everyone can easily collaborate to a single Spotify session.

## Key features:
- Authentication & searching for songs through Spotify API
- Own playback queue implementation in the backend (this is required, because Spotify API doesn’t allow the local playback queue to be modified, thus completely new implementation is needed)
- Creation & sharing of playback sessions using hashes as identifiers

## How to use:
1. Sign-in through Spotify log-in screen on the front page (unfortunately having a Spotify premium account is mandatory so that Spotify terms & conditions are not violated) 

If you are creating a new session: 

2. Press create session
3. Open Spotify app on the device you want the music to be played through and put any song on play
4. Disable crossfade in Spotify settings
5. Copy the link to your session & share with your friends
6. Now anyone with the link & Spotify premium account can add songs to your playback queue!
7. When stopping the session, remember to press back and delete your session!

Joining a session:

2. Receive a link from your friend that is hosting the session
3. Add your favorite songs to the playback queue!

## Start development
1. Install yarn packages `yarn install`
2. Start development server `yarn start`
3. Server running at `http://localhost:3000/`
4. Create production build `yarn build`
