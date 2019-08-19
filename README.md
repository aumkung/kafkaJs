# Usage

## Docker Start up

**Start a cluster:**

docker-compose up -d

**Add more brokers:**

docker-compose scale kafka=3

**Destroy a cluster:**

docker-compose stop

## Node Start up

**Run Service Api**

npm run serv

**Run test producer**

npm run producer

**Run test consumer**

npm run consumer