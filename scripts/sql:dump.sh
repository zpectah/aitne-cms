#!/bin/bash

export $(grep -v '^#' .env | xargs)

param=${1:-'dump'}

docker exec $CMS_DOCKER_DB_CONTAINER mysqldump -u $CMS_DB_USER -p$CMS_DB_PASSWORD $CMS_DB_NAME > migrations/$param.sql
