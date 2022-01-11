dev: 
	docker-compose -f docker-compose.dev.yml --env-file .env up -d --build
prod: 
	docker-compose -f docker-compose.prod.yml --env-file .env up --force-recreate --build -d && docker image prune -f