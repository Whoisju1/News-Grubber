#!/bin/sh

export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120

echo "----- RUNNING UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml up -d \
&& echo "----- RUNNING CLIENT UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml exec client_unit_test npx react-scripts test --watchAll=false \
&& echo "----- RUNNING API UNIT TESTS -----" \
&& docker-compose -f docker-compose.test.yml exec api_unit_tests npm run test:unit \
&& echo "✔✔ All tests passed ✔✔" \
&& docker-compose -f docker-compose.test.yml down --remove-orphans
