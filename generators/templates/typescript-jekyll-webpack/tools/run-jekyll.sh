#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if hash bundler 2>/dev/null; then
  echo "bundler is installed"
  else
  echo "you need to install bundler \`gem install bundler\`"
  echo "See https://bundler.io/"
  exit 1
fi

bundle exec jekyll serve --livereload
# bundle exec jekyll serve --livereload --livereload_min_delay 1 --trace
