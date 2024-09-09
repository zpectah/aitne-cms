#!/bin/bash

export $(grep -v '^#' .env | xargs)

param=${1:-$DB_DUMP_DEFAULT}

docker exec -i $DB_ROOT_CONTAINER mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < migrations/$param.sql
