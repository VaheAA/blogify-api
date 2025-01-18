.PHONY: clean-containers clean-images clean-all

# Clean up all Docker containers
clean-containers:
	@echo "Stopping all running containers..."
	@docker ps -q | xargs -r docker stop
	@echo "Removing all containers..."
	@docker ps -a -q | xargs -r docker rm
	@echo "All containers have been removed."

# Clean up all Docker images
clean-images:
	@echo "Removing all Docker images..."
	@docker images -q | xargs -r docker rmi -f
	@echo "All Docker images have been removed."

# Clean everything (containers and images)
clean-all: clean-containers clean-images
	@echo "All containers and images have been removed."
