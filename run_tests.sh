#!/bin/sh

export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120

echo "----- RUNNING UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml down --remove-orphans \
&& docker-compose -f docker-compose.test.yml up -d \
&& echo "----- RUNNING CLIENT UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml run client-unit-test npx react-scripts test --watchAll=false \
&& echo "----- RUNNING API UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml run api-unit-test npm run test:unit \
&& echo "✔✔ All tests passed ✔✔" \
&& docker-compose -f docker-compose.test.yml down --remove-orphans
