#!/bin/bash

export $(grep -v '^#' .env | xargs)

param=${1:-'dump'}

docker exec -i $CMS_DOCKER_DB_CONTAINER mysql -u $CMS_DB_USER -p$CMS_DB_PASSWORD $CMS_DB_NAME < migrations/$param.sql
