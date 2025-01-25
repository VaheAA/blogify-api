.PHONY: clean-containers clean-images clean-all create-migration migrations-up migrations-down dev prod start

# Set project name as a variable for reusability
PROJECT_NAME := blogify
ENV ?= dev

# Create migration file for Mikro-ORM
create-migration:
	@docker exec -it $(PROJECT_NAME)-api-$(ENV) npx mikro-orm migration:create

# Run migrations
migrations-up:
	@docker exec -it $(PROJECT_NAME)-api-$(ENV) npx mikro-orm migration:up

# Rollback migration
migrations-down:
	@docker exec -it $(PROJECT_NAME)-api-$(ENV) npx mikro-orm migration:down

# Start containers (dynamically for DEV or PROD)
start:
ifeq ($(ENV), dev)
	@echo "Starting development environment..."
	@npm run start:docker:dev
else ifeq ($(ENV), prod)
	@echo "Starting production environment..."
	@npm run start:docker:prod
else
	@echo "Unknown environment: $(ENV). Please set ENV=dev or ENV=prod."
	exit 1
endif
	@make migrations-up ENV=$(ENV)

# Shortcut for dev environment
dev:
	@make start ENV=dev

# Shortcut for prod environment
prod:
	@make start ENV=prod

# Cleanup commands
clean-containers:
	@docker rm -f $(shell docker ps -aq)

clean-images:
	@docker rmi -f $(shell docker images -q)

clean-all: clean-containers clean-images
	@echo "All containers and images have been removed."
