#!/bin/bash

cd lambda
npx sequelize-cli db:migrate --env=test
npx sequelize-cli db:seed:all --env=test
cd -
