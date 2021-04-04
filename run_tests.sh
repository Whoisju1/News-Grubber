#!/bin/sh

export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120

echo "----- RUNNING UNIT TESTS -----" \
&& docker-compose down --remove-orphans \
&& docker-compose -f docker-compose.test.yml up -d test-db-mongo test-db-redis api-base \
&& docker-compose -f docker-compose.test.yml up --abort-on-container-exit client_unit_test\
&& docker-compose -f docker-compose.test.yml up --abort-on-container-exit api_unit_tests\
&& echo "✔✔ All tests passed ✔✔" \
&& docker-compose down --remove-orphans
