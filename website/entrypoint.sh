#!/bin/sh

# Exit on any error
set -e

echo "Starting vFly website application..."

# Extract database connection details from DATABASE_URI if available
# Format: postgres://user:password@host:port/database
if [ -n "$DATABASE_URI" ]; then
  # Extract host and port from DATABASE_URI
  DB_HOST=$(echo "$DATABASE_URI" | sed -n 's/.*@\([^:]*\):.*/\1/p')
  DB_PORT=$(echo "$DATABASE_URI" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
  
  # Use extracted values or fallback to environment variables or defaults
  DATABASE_HOST=${DATABASE_HOST:-${DB_HOST:-localhost}}
  DATABASE_PORT=${DATABASE_PORT:-${DB_PORT:-5432}}
else
  # Use environment variables or defaults
  DATABASE_HOST=${DATABASE_HOST:-localhost}
  DATABASE_PORT=${DATABASE_PORT:-5432}
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
max_attempts=30
attempt=0
while ! nc -z "$DATABASE_HOST" "$DATABASE_PORT"; do
  attempt=$((attempt + 1))
  if [ $attempt -gt $max_attempts ]; then
    echo "Database connection timeout after $max_attempts attempts"
    echo "Failed to connect to $DATABASE_HOST:$DATABASE_PORT"
    exit 1
  fi
  echo "Waiting for database... (attempt $attempt/$max_attempts)"
  sleep 2
done
echo "Database is ready!"

# Run Payload migrations
echo "Running Payload migrations..."
if ! /pnpm/pnpm run payload migrate; then
  echo "Failed to run Payload migrations"
  exit 1
fi

# Generate Payload types (in case they're needed)
echo "Generating Payload types..."
if ! /pnpm/pnpm run generate:types; then
  echo "Warning: Failed to generate Payload types (continuing anyway)"
fi

echo "Database setup completed successfully!"
echo "Starting Next.js server..."
# Start the Next.js application
exec node server.js
