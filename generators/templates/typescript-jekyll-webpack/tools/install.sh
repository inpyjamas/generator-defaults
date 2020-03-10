#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
neededRubyVersion="2.6"
installedRubyVersion=$(ruby -v)
neededNodeVersion="12."
installedNodeVersion=$(node -v)
if [[  $installedRubyVersion == *"${neededRubyVersion}"* ]]; then
  echo "Got the right ruby version"
  else
  echo "You need at least ruby ${neededRubyVersion}"
  echo "We suggest using rbenv https://github.com/rbenv/rbenv"
  exit 1;
fi

if [[  $installedNodeVersion == *"${neededNodeVersion}"* ]]; then
  echo "Got the right node version"
  else
  echo "You need at least Node.js >= ${neededNodeVersion}"
  echo "We suggest using nvm https://github.com/nvm-sh/nvm"
  exit 1;
fi


# if [[ $neededRubyVersion == *"2.6"* ]]; then
#   echo "got the right ruby version"
#   else
#   echo "You need at least ruby ${neededRubyVersion}"
#   echo "We suggest using rbenv https://github.com/rbenv/rbenv"
#   exit 1;
# fi

if hash gem 2>/dev/null; then
  echo "\`gem\` is installed"
  else
  echo "you need ruby and the gem command installed"
  echo "We suggest using rbenv https://github.com/rbenv/rbenv"
  exit 1
fi

if hash bundler 2>/dev/null; then
  echo "\`bundler\` is installed"
  else
  echo "you need to install bundler \`gem install bundler\`"
  echo "See https://bundler.io/"
  exit 1
fi

echo "All good! Prerequisites met ready to install"
read -p "Do you want to proceed?(y/N) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  echo "OK. Abort!"
  exit 1
fi

bundle install
npm install