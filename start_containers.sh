#!/bin/bash/

clear

function printGreenText()
{
  printf "\e[32m$*\e[0m \n"
}

function printRedText()
{
  printf "\e[31m$*\e[0m \n"
}

function start_containers()
{
  printf '\e[32m... Taking down containers ...\e[0m \n' \
  && docker-compose down \
  && printf '\e[32m... buidling containers ....\e[0m \n' \
  && docker-compose up -d "$@" \
  && printf '\e[32m... containers built successfully ...\e[0m \n' \
  && docker-compose logs -f
}

printf "\e[35mDo you want to build images? (Y/N)\e[0m "

read answer

if [[ ${answer} =~ ^Yes|yes|y|Y$ ]]
then
  printGreenText "You choose to build images."
  start_containers --build
elif [[ ${answer} =~ ^No|no|n|N$ ]]
then
  printGreenText "You chose not to build images."
  start_containers
else
  printRedText "Answer not recorgnized."
  exit 1
fi
