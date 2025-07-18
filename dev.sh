#!/bin/bash

echo "🚀 Setting up development environment..."

check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
    echo "✅ Docker is running"
}

start_db() {
    echo "🐘 Starting PostgreSQL database..."
    docker-compose -f docker-compose.dev.yml up -d
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    max_attempts=30
    attempt=0
    while ! nc -z localhost 5437; do
        attempt=$((attempt + 1))
        if [ $attempt -gt $max_attempts ]; then
            echo "❌ Database connection timeout after $max_attempts attempts"
            exit 1
        fi
        echo "   Waiting for database... (attempt $attempt/$max_attempts)"
        sleep 2
    done
    echo "✅ Database is ready!"
}

start_app() {
    echo "🌐 Starting Next.js application..."
    echo "📝 Note: The app will be available at http://localhost:3000"
    echo "🔗 Database will be available at localhost:5438"
    echo ""
    echo "To stop the database later, run:"
    echo "   docker-compose -f docker-compose.dev.yml down"
    echo ""
    cd website
    pnpm dev
}

# Main execution
main() {
    # Copy local environment file
    if [ ! -f local.env ]; then
        echo "❌ local.env file not found. Please create it first."
        exit 1
    fi
    
    # Use local environment for development
    export $(cat local.env | grep -v '^#' | xargs)
    
    check_docker
    start_db
    generate_client
    run_migrations
    start_app
}

# Run main function
main "$@"
