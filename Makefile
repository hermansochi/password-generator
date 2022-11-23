init: init-ci react-ready
	
init-ci: docker-down-clear \
	react-clear \
	docker-pull docker-build docker-up \
	react-init

up: docker-up
down: docker-down
restart: down up
lint: react-lint
lint-fix: react-lint-fix

images:
	docker images

prune:
	docker system prune

memory:
	sudo sh -c "echo 3 > /proc/sys/vm/drop_caches"

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-down-clear:
	docker compose down -v --remove-orphans

docker-pull:
	docker compose pull

docker-build:
	docker compose build --pull

react-clear:
	docker run --rm -v ${PWD}/react:/app -w /app alpine sh -c 'rm -rf .ready build'

react-init: react-yarn-install

react-yarn-install:
	docker compose run --rm password-node-cli yarn install

react-ready:
	docker run --rm -v ${PWD}/react:/app -w /app alpine touch .ready

react-lint:
	docker compose run --rm password-node-cli yarn eslint
	docker compose run --rm password-node-cli yarn stylelint

react-lint-fix:
	docker compose run --rm password-node-cli yarn eslint-fix

react-test-watch:
	docker compose run --rm password-node-cli yarn test

react-test:
	docker compose run --rm password-node-cli yarn test --watchAll=false

build: build-frontend

build-frontend:
	docker --log-level=debug build --pull --file=react/docker/production/nginx/Dockerfile --tag=${REGISTRY}/password-react:${IMAGE_TAG} react

try-build:
	REGISTRY=localhost IMAGE_TAG=0 make build

push: push-react

push-react:
	docker push ${REGISTRY}/password-react:${IMAGE_TAG}

deploy:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker network create --driver=overlay --attachable traefik-public || true'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf site_pwd_${BUILD_NUMBER} && mkdir site_pwd_${BUILD_NUMBER}'
	envsubst < docker-compose-production.yml > docker-compose-production-env.yml
	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production-env.yml deploy@${HOST}:site_pwd_${BUILD_NUMBER}/docker-compose.yml
	rm -f docker-compose-production-env.yml
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_pwd_${BUILD_NUMBER} && docker stack deploy --compose-file docker-compose.yml pwd --with-registry-auth --prune'

deploy-clean:
	rm -f docker-compose-production-env.yml

rollback:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_pwd_${BUILD_NUMBER} && docker stack deploy --compose-file docker-compose.yml pwd --with-registry-auth --prune'
