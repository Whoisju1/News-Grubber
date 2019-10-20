#!/bin/bash/

clear && printf 'Taking down containers...\n' \
&& docker-compose down \
&& clear && printf 'buidling containers ....\n' \
&& docker-compose up -d \
&& clear && printf 'containers built successfully\n' \
&& docker-compose logs -f
