#!/bin/sh

echo "----- RUNNING UNIT TESTS -----" \
&& docker-compose down --remove-orphans \
&& docker-compose -f docker-compose.test.yml up --abort-on-container-exit --build \
&& echo "✔✔ All tests passed ✔✔" \
&& docker-compose down --remove-orphans
