.PHONY: clean-containers clean-images clean-all create-migration migrations-up migrations-down dev prod

# Set project name as a variable for reusability
PROJECT_NAME := blogify

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
