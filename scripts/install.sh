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
    echo "Deno is not installed. Installing Deno...📦"
    curl -fsSL https://deno.land/x/install/install.sh | sh
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew install deno
  elif [[ "$OSTYPE" == "msys" ]]; then
    choco install deno
  else
    echo "Unsupported OS: $OSTYPE"
    exit 1
  fi
}

# Check if Deno is installed, and install if not
if ! is_deno_installed; then
  echo "Deno is not installed. Installing Deno...📦"
  install_deno
fi

# Build the Deno project
deno compile -A --output cocli https://deno.land/x/cocli/cli.ts

if [[ -f cocli ]]; then
  echo "Executable compiled successfully.📦"
  mv cocli /usr/local/bin/
  echo "Cocli is now available globally.🌱🚀"
else
  echo "Compilation failed.❌"
  exit 1
fi