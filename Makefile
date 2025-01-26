.PHONY: clean-containers create-migration migrations-up migrations-down dev prod start

# Set project name as a variable for reusability
PROJECT_NAME := blogify
ENV ?= dev

# Create migration file for Mikro-ORM (works only locally)
create-migration:
	@docker exec -it $(PROJECT_NAME)-api-$(ENV) npx mikro-orm migration:create

# Run migrations (works only locally)
migrations-up:
	@docker exec -it $(PROJECT_NAME)-api-$(ENV) npx mikro-orm migration:up

# Rollback migration (works only locally)
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

# Cleanup commands (only for project-related containers and images)
clean-containers:
	@docker ps -a --filter "name=$(PROJECT_NAME)" --format "{{.ID}}" | xargs -r docker rm -f
	@echo "All containers related to $(PROJECT_NAME) have been removed."