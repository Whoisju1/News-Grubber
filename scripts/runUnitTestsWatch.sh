#!/bin/sh

echo  Running API unit tests
# execute test within api-test container
docker-compose run api-test npm run test:unit:debug \
|| echo  "make sure that the requisite containers are running by running command \"docker-compose up -d\""
