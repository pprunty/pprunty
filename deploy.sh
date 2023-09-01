#!/bin/bash

env=$1

# Check if jq is installed, if not, install it
if ! command -v jq &> /dev/null; then
  echo "jq is not installed. Installing..."
  brew install jq
fi

# Check if wintersmith is installed, if not, install it
if ! command -v wintersmith &> /dev/null; then
  echo "Wintersmith is not installed. Installing..."
  npm install -g wintersmith
fi

# Function to update config.json
update_config() {
  env=$1
  if [ "$env" == "prod" ]; then
    jq '.locals.url = "https://pprunty.github.io/pprunty" | .locals.stylesheet = "https://pprunty.github.io/pprunty/css/main.css"' config.json > tmp.json && mv tmp.json config.json
    echo "Webpage will be displayed on: https://pprunty.github.io/pprunty"
  elif [ "$env" == "dev" ]; then
    jq '.locals.url = "http://localhost:8080" | .locals.stylesheet = "http://localhost:8080/css/main.css"' config.json > tmp.json && mv tmp.json config.json
    echo "Webpage will be displayed on: http://localhost:8080"
  else
    echo "Invalid environment. Use 'prod' or 'dev'."
    exit 1
  fi
}

# Check for number of arguments
if [ "$#" -ne 1 ]; then
  echo "Usage: ./update_config.sh [prod|dev]"
  exit 1
else
  update_config $1
fi

# Run wintersmith build
if wintersmith build; then
  echo "Wintersmith build successful."
else
  echo "Wintersmith build failed."
  exit 1
fi

if [ "$env" == "prod" ]; then
  # Ask user if they want to deploy to GitHub Pages
  read -p "Would you like to deploy to GitHub Pages? (y/n): " -n 1 -r
  echo  # Move to a new line for better readability

  if [[ $REPLY =~ ^[Yy]$ ]]; then
      # Define the branch and directory variables
      SOURCE_BRANCH="main"
      TARGET_BRANCH="gh-pages"
      DIRECTORY_TO_COPY="build/*"

      # Stash any changes outside the build/ directory to keep the working directory clean
      git stash --keep-index

      # Add and commit changes in the build/ directory
      git add $DIRECTORY_TO_COPY
      git commit -m "Committing local changes in build/ directory"

      # Checkout to the target branch
      git checkout $TARGET_BRANCH

      # Copy the contents from the specified directory to the current directory
      cp -R $DIRECTORY_TO_COPY .

      # Add, commit, and push the changes
      git add .
      git commit -m "Automated push from $SOURCE_BRANCH to $TARGET_BRANCH"
      git push origin $TARGET_BRANCH

      # Switch back to the source branch
      git checkout $SOURCE_BRANCH

      # Apply stashed changes, if any
      git stash apply

      echo "Successfully pushed the contents from $SOURCE_BRANCH:$DIRECTORY_TO_COPY to $TARGET_BRANCH."
    echo "Deployed to GitHub Pages."
  else
    echo "Not deploying to GitHub Pages."
  fi
elif [ "$env" == "dev" ]; then
  echo "Previewing wintersmith project locally."
  wintersmith preview
fi
