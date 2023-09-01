#!/bin/bash

# Step 1: Build the Wintersmith project
echo "Building Wintersmith project..."
wintersmith build
if [ $? -ne 0 ]; then
  echo "Wintersmith build failed. Exiting."
  exit 1
fi

# Step 2: Check if gh-pages branch exists
git rev-parse --verify gh-pages
if [ $? -eq 0 ]; then
  echo "Switching to gh-pages branch..."
  git checkout gh-pages
else
  echo "Creating new gh-pages branch..."
  git checkout -b gh-pages
fi

# Step 3: Copy build contents to root
echo "Copying build content to root..."
cp -r build/* .

# Step 4: Add and commit changes
echo "Committing changes..."
git add .
git commit -m "Deploy to GitHub Pages"

# Step 5: Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages

# Step 6: Switch back to the main branch
git checkout main

echo "Deployment to GitHub Pages complete."
