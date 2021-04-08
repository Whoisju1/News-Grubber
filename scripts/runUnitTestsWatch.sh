#!/bin/sh

# make sure containers are up and running before test is executed
docker-compose up -d "$@"
clear
echo  Running API unit tests
# execute test within api-test container
docker-compose run api-test npm run test:unit:debug
