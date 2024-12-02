#!/usr/bin/env bash

# download node runtime binaries

# mkdir a directory for the binaries with todays date in a variable
target_dir="node-v22.11.0-$(date +%Y-%m-%d)"
mkdir -p "$target_dir"
cd "$target_dir"

# if arm, or x64 download the correct binary
if [ "$(uname -m)" == "arm64" ]; then
    curl -L https://nodejs.org/dist/v22.11.0/node-v22.11.0-linux-arm64.tar.xz -o node-v22.11.0-linux-arm64.tar.xz
    tar xvfJ node-v22.11.0-linux-arm64.tar.xz -C .
else
    curl -L https://nodejs.org/dist/v22.11.0/node-v22.11.0-linux-x64.tar.gz -o node-v22.11.0-linux-x64.tar.gz
    tar xvf node-v22.11.0-linux-x64.tar.gz -C .
fi

# cd node*
cd bin

node_binary=$(pwd)/node
npm_binary=$(pwd)/npm

cd ../..

$npm_binary start

