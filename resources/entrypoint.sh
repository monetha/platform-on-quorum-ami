#!/bin/bash

FLAG="/var/log/quorum/execution.log"
CONTRACTSFLAG="/home/ubuntu/monetha-reputation-contracts/migrations.log"
INITSH="/home/ubuntu/quorum-examples/examples/7nodes/raft-init.sh"
STARTSH="/home/ubuntu/quorum-examples/examples/7nodes/raft-start.sh"
CONTRACTS="/home/ubuntu/monetha-reputation-contracts"

if [ ! -f $FLAG ]; then
    echo "This is the first time service ran, need to initialize"
    echo "Will run ./raft-init.sh"
    echo "Trying to run $INITSH at $(date)" 2>&1 | tee -a $FLAG

    . "$INITSH"
fi

echo "Trying to run $STARTSH at $(date)" 2>&1 | tee -a $FLAG
(. "$STARTSH")
echo "Executed $STARTSH at $(date)" 2>&1 | tee -a $FLAG

if [ ! -f $CONTRACTSFLAG ]; then
    echo "Contracts migration log not found" 2>&1 | tee -a $FLAG
    echo "Trying to migrate contracts at $(date)" 2>&1 | tee -a $FLAG
    cd $CONTRACTS
    npm install
    npm run build-contracts
    npm run truffle-migrate 2>&1 | tee -a $CONTRACTSFLAG
fi