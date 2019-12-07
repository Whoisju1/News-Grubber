#!/bin/sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml config > compose.yml \
&& cat compose.yml \
&& docker stack deploy -c compose.yml news-grubber \
&& rm -rf compose.yml \
&& echo "----------- stack deployed -----------" \
&& echo "----------- service list -----------" \
&& docker service ls