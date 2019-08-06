#!/bin/bash
set -x
ssh ubuntu@$IP <<EOF
    if [[ $TRAVIS_BRANCH = 'master' ]]
    then
        cd ~/spotishare-front
        git reset --hard HEAD
        git pull
        echo "Running npm install"
        npm install
        echo "Running npm build"
        npm run build
        echo "Latest version of spotishare-front running."
    fi
EOF
