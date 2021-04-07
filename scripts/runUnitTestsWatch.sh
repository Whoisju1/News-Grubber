#!/bin/sh

# make sure containers are up and running before test is executed
docker-compose up -d "$@"
clear
# execute test within api-test container
docker-compose exec api-test npm run test:unit:debug
