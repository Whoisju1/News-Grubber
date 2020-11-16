#!/bin/sh

echo "----- RUNNING UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml up --abort-on-container-exit --build \
&& docker-compose down --remove-orphans
