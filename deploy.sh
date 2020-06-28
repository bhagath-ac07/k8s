docker build -t bhagathac/multi-client:latest -t bhagathac/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t bhagathac/multi-server:latest -t bhagathac/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t bhagathac/multi-worker:latest -t bhagathac/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push bhagathac/multi-client:latest
docker push bhagathac/multi-server:latest
docker push bhagathac/multi-worker:latest
docker push bhagathac/multi-client:$SHA
docker push bhagathac/multi-server:$SHA
docker push bhagathac/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=bhagathac/multi-server:$SHA
kubectl set image deployments/client-deployment client=bhagathac/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=bhagathac/multi-worker:$SHA