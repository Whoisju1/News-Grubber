
image_id=$(docker image build -t whoisju1/news-grubber-api-dev ./Dockerfile.dev -q) && \
container_id=$(docker container run -itd -p "5000:5000" --name news-grubber-api-dev $image_id) && \
docker container logs $container_id -f --details