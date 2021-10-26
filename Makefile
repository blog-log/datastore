docker-build:
	docker build -t datastore:v0.0.1 .

docker-run:
	docker run -it -p 8080:8080 --env-file .env datastore:v0.0.1 

compose-run:
	docker-compose up

generate-secret-dev:
	kubectl create secret generic datastore-secret --dry-run=client --from-env-file=.env.dev -o yaml > k8s/secret-dev.yaml

generate-secret-prod:
	kubectl create secret generic datastore-secret --dry-run=client --from-env-file=.env.prod -o yaml > k8s/secret-prod.yaml