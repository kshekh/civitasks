#!/bin/bash

# Check if an argument is provided
if [ "$#" -ne 1 ]; then
    echo "please provide a name for the migration, e.g. 'user_model_updates'"
    exit 1
fi

# Get the current timestamp in the desired format
timestamp=$(date +"%Y%m%dT%H%M%S")

# Create the file with the desired name
touch "src/database/migrations/staging/${timestamp}_$1.ts"

echo "File ${timestamp}_$1.ts created."

