up: docker-up

init: docker-clear docker-up api-permissions api-env api-composer pause frontend-env frontend-install websocket-env websocket-install websocket-start

docker-clear:
	docker-compose down --remove-orphans
	sudo rm -rf api/var/docker

docker-up:
	docker-compose up --build -d

pause:
	sleep 5

api-permissions:
	sudo chmod 777 api/var
	sudo chmod 777 api/var/cache
	sudo chmod 777 api/var/log

api-env:
	docker-compose exec api-php-cli rm -f .env
	docker-compose exec api-php-cli ln -s .env.example .env

api-composer:
	docker-compose exec api-php-cli composer install

api-migration:
	docker-compose exec api-php-cli composer app migrations:migrate


frontend-env:
	docker-compose exec frontend-nodejs rm -f .env.local
	docker-compose exec frontend-nodejs ln -s .env.local.example .env.local

frontend-install:
	docker-compose exec frontend-nodejs npm install

frontend-build:
	docker-compose exec frontend-nodejs npm run build

websocket-env:
	docker-compose exec websocket-nodejs rm -f .env
	docker-compose exec websocket-nodejs ln -s .env.example .env

websocket-install:
	docker-compose exec websocket-nodejs npm install

websocket-start:
	docker-compose exec websocket-nodejs npm run start