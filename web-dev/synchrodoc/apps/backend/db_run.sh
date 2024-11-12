docker run --detach -p 5555:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=database postgres:latest
# docker run --detach -p 9000:9000 -p 9001:9001 minio/minio server /data --console-address ":9001"
docker run --detach -p 6379:6379 redis
