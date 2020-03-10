#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
npm ci
bundle install
npm run webpack:prod
bundle exec jekyll build