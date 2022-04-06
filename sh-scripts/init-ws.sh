#!/bin/bash
geth init \
  --datadir ./db \
  $1 \
  --dev \
  --networkid $2 \
  --ws \
  --ws.port $3 \
  --ws.origins $4 \
  --port 30303 \
  --nodiscover \
  --ws.api="admin,eth,debug,miner,net,txpool,personal,web3" \
  --allow-insecure-unlock