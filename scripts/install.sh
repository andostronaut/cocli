#!/bin/bash

# Function to check if Deno is installed
is_deno_installed() {
  if command -v deno &>/dev/null; then
    return 0
  else
    return 1
  fi
}

# Function to install Deno
install_deno() {
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    echo "Deno is not installed. Installing Deno on linux via curl...📦"
    curl -fsSL https://deno.land/x/install/install.sh | sh
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Deno is not installed. Installing Deno on macos via brew...📦"
    brew install deno
  elif [[ "$OSTYPE" == "msys" ]]; then
    echo "Deno is not installed. Installing Deno on windows via choco...📦"
    choco install deno
  else
    echo "Unsupported OS: $OSTYPE"
    exit 1
  fi
}

# Check if Deno is installed, and install if not
if ! is_deno_installed; then
  install_deno
fi

export DENO_INSTALL="/home/runner/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

# Build the Deno project
echo "Compiling Cocli...📦"
deno compile -A --output cocli https://deno.land/x/cocli/cli.ts
echo "Compilation finished..✅"

if [[ -f cocli ]]; then
  echo "Executable compiled successfully.📦"
  mv cocli /usr/local/bin/
  echo "Cocli is now available globally.🌱🚀"
else
  echo "Compilation failed.❌"
  exit 1
fi