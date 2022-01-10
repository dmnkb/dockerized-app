dev: 
	docker-compose -f "docker-compose.dev.yml" up -d --build
prod: 
	docker-compose -f "docker-compose.prod.yml" build --no-cache && docker-compose -f "docker-compose.prod.yml" up -d