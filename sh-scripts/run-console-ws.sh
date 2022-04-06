#!/bin/bash
geth console \
  --datadir ./db \
  --networkid $1 \
  --ws \
  --ws.port $2 \
  --ws.origins "*" \
  --port 30303 \
  --nodiscover \
  --ws.api="admin,eth,debug,miner,net,txpool,personal,web3" \
  --ws.addr "0.0.0.0" \
  --allow-insecure-unlock\
  $3 $4\
  $5 $6\