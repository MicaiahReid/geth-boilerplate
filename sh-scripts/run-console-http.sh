#!/bin/bash
geth console \
  --datadir ./db \
  --networkid $1 \
  --http \
  --http.port $2 \
  --http.corsdomain "*" \
  --port 30303 \
  --nodiscover \
  --http.api="admin,eth,debug,miner,net,txpool,personal,web3" \
  --http.addr "0.0.0.0" \
  --allow-insecure-unlock \
  $3 $4\
  $5 $6\