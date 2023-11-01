# POST COMMENTS

## Description
This project serves as a backend for an application for publishing posts and associated comments.
This project is built with [AdonisJS](https://adonisjs.com/),
[MySql](https://www.mysql.com/) and [Docker](https://www.docker.com/)


## Installation and starting the server

```bash
$ cp .env.exemple .env
```

```bash
$ docker-compose up
```

## Stopping the server

```bash
$ docker-compose down
```
##  I- Prepare the database
#### Step1- Access phpmyadmin via the address:
```
127.0.0.1:8080
```

#### Step2: create the database named "post-comments"

## II- Run the app

#### step1- connect to the api container

```bash
$ docker exec -it post-comments-api-container sh
```
#### step2- Migrate database

```bash
$ node ace migration:run
```

#### step3- Execute database seed

```bash
$ node ace db:seed  
```
#####  now everything is correct, you can access the swagger at the address:
```
127.0.0.1:3333
```

## Redis

#####  you can visualize the redis database with redisinsight to the address:
```
127.0.0.1:8001
```


