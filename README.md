# AitneCMS

## Motivation

The motivation was to create a fully customizable Headless CMS and fully adapt it to your own needs.

## Description

The CMS offers basic content types such as [article, page, category, tag] and can be extended with custom model schemas.

## Development

### Installation
To run the application, we need Docker, or better Docker Desktop. The database and Adminer for database management run in the container.

1. Install dependencies:
    ```sh
    yarn install
    ```
2. Running the wizard to create base variables:
    ```sh
    yarn setup:env
    ```
3. Preparing the container for Docker (At the first start, images of dependencies in Docker are downloaded):
    ```sh
    yarn db:create
    ```
4. Running the database preparation wizard:
    ```sh
    yarn setup:db
    ```
 

### Development

1. Running the development script in a browser window:
    ```sh
    yarn start:admin
    ```
   Or if you need to share on local network:
    ```sh
    yarn start:admin:host
    ```
2. Starting a server with an API:
    ```sh
    yarn start:api
    ```
3. Running Docker container:
    ```sh
    yarn db:start
    ``` 

### Linter
Run code and syntax check:
```sh
yarn lint:all
```

### Tests
Running tests:
```sh
yarn test:vite
```

### Other scripts

* todo


## Models

* Users
* Articles
* Pages
* Categories
* Tags
* Translations
* Comments
* Media
* Members
 

* Custom Fields
* Custom Fields item




## API

### Local API

### API for other applications



## Docker

* todo

