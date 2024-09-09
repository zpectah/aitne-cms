#!/bin/bash

export $(grep -v '^#' .env | xargs)

param=${1:-$DB_DUMP_DEFAULT}

docker exec $DB_ROOT_CONTAINER mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > migrations/$param.sql
