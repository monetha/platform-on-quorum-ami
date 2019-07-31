#!/bin/bash
set -e -o pipefail

docker run \
    -it \
    --rm \
    --env-file ./env_variables.list \
    -v $PWD:/source:z \
    hashicorp/packer:latest \
    validate /source/monetha-platform-on-quorum-ami.json

docker run \
    -it \
    --rm \
    --env-file ./env_variables.list \
    -v $PWD:/source:z \
    --workdir /source \
    hashicorp/packer:latest \
    build /source/monetha-platform-on-quorum-ami.json