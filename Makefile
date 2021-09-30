docker-build:
	docker build -t datastore:v0.0.1 .

docker-run:
	docker run -it -p 8080:8080 --env-file .env datastore:v0.0.1 

generate-secret-dev:
	kubectl create secret generic firebase-secret --dry-run=client --from-file=/mnt/c/workspace/keys/dev/firebase-sa.json -o yaml > k8s/secret-dev.yaml

generate-secret-prod:
	kubectl create secret generic frontend-secret --dry-run=client --from-file=/mnt/c/workspace/keys/prod/firebase-sa.json -o yaml > k8s/secret-prod.yaml