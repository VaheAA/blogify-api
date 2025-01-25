.PHONY: clean-containers clean-images clean-all create-migration migrations-up migrations-down dev prod

# Set project name as a variable for reusability
PROJECT_NAME := blogify

# Clean up project-related Docker containers
clean-containers:
	@echo "Stopping project-related containers..."
	@docker ps -q --filter "name=$(PROJECT_NAME)" | xargs -r docker stop
	@echo "Removing project-related containers..."
	@docker ps -a -q --filter "name=$(PROJECT_NAME)" | xargs -r docker rm
	@echo "Project-related containers have been removed."

# Clean up project-related Docker images
clean-images:
	@echo "Removing project-related Docker images..."
	@docker images -q --filter "reference=$(PROJECT_NAME)" | xargs -r docker rmi -f
	@echo "Project-related images have been removed."

# Clean project-related containers and images
clean-all: clean-containers clean-images
	@echo "All project-related containers and images have been removed."

# Create migration file for Mikro-ORM
create-migration:
	@docker exec -it $(PROJECT_NAME)-api-dev npx mikro-orm migration:create

# Run migrations
migrations-up:
	@docker exec -it $(PROJECT_NAME)-api-dev npx mikro-orm migration:up

# Rollback migration
migrations-down:
	@docker exec -it $(PROJECT_NAME)-api-dev npx mikro-orm migration:down

# Start DEV containers
dev:
	@npm run start:docker:dev
	@make migrations-up

# Start PROD containers
prod:
	@npm run start:docker:prod
	@make migrations-up
