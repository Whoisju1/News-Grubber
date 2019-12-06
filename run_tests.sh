#!/bin/bash/

printf "\n\e[34m----- RUNNING TESTS FOR \`API\` CONTAINER -----\e[m\n\n" \
&& docker-compose run -e NODE_ENV=test --rm --entrypoint "npx jest --runInBand --forceExit --detectOpenHandles" api \
&& printf "\n\e[34m----- RUNNING TESTS FOR \`CLIENT\` CONTAINER -----\e[m\n\n" \
&& docker-compose run -e NODE_ENV=test --rm --entrypoint "npx react-scripts test --watchAll=false" client