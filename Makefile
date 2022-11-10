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
	docker compose run --rm react-node-cli yarn install

react-ready:
	docker run --rm -v ${PWD}/react:/app -w /app alpine touch .ready

react-lint:
	docker compose run --rm react-node-cli yarn eslint
	docker compose run --rm react-node-cli yarn stylelint

react-lint-fix:
	docker compose run --rm react-node-cli yarn eslint-fix

react-test-watch:
	docker compose run --rm react-node-cli yarn test

react-test:
	docker compose run --rm react-node-cli yarn test --watchAll=false


build: build-api build-frontend

build-frontend:
	docker --log-level=debug build --pull --file=react/docker/production/nginx/Dockerfile --tag=${REGISTRY}/pet-react:${IMAGE_TAG} react

try-build:
	REGISTRY=localhost IMAGE_TAG=0 make build

push: push-react

push-react:
	docker push ${REGISTRY}/pet-react:${IMAGE_TAG}

deploy:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf site_${BUILD_NUMBER} && mkdir site_${BUILD_NUMBER}'
	envsubst < docker-compose-production.yml > docker-compose-production-env.yml
	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production-env.yml deploy@${HOST}:site_${BUILD_NUMBER}/docker-compose.yml
	rm -f docker-compose-production-env.yml
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'mkdir site_${BUILD_NUMBER}/secrets'
	scp -o StrictHostKeyChecking=no -P ${PORT} ${API_DB_PASSWORD_FILE} deploy@${HOST}:site_${BUILD_NUMBER}/secrets/api_db_password
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && docker stack deploy  --compose-file docker-compose.yml server --with-registry-auth --prune'

deploy-clean:
	rm -f docker-compose-production-env.yml

rollback:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd site_${BUILD_NUMBER} && docker stack deploy --compose-file docker-compose.yml auction --with-registry-auth --prune'

validate-jenkins:
	curl --user ${USER} -X POST -F "jenkinsfile=<Jenkinsfile" ${HOST}/pipeline-model-converter/validate