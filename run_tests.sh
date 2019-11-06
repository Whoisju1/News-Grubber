#!/bin/bash/

echo "----- Running backend tests -----" \
&& docker-compose -p api-tests run --rm api npm run test:unit \
&& echo "----- Running frontend tests -----" \
&& docker-compose -p client-tests run --rm client npm run test:unit