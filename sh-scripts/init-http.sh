#!/bin/bash
geth init \
  --datadir ./db \
  $1 \
  --dev \
  --networkid $2 \
  --http \
  --http.port $3 \
  --http.corsdomain "*" \
  --port 30303 \
  --nodiscover \
  --http.api="admin,eth,debug,miner,net,txpool,personal,web3" \
  --allow-insecure-unlock