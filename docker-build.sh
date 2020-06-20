#!/usr/bin/env sh

docker build -t elliotjreed/www.crescenthr.co.uk . --no-cache
docker push elliotjreed/www.crescenthr.co.uk
