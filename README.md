# Salus proxy

This tiny webservice allows you to list Salus thermostats, set temperature and operation mode.

All endpoints are protected with basic authentication.

DO NOT EXPOSE THIS SERVICE TO INTERNET!

## Starting

Before using the service, copy `.env.dist` as `.env`. Then run `yarn`.

## Scripts

 * `yarn dev` - runs a dev instance of the service. `.env` file must exists.
 * `yarn docker:build` - builds a docker image
 * `yarn docker:run` -  runs built docker image
 * `yarn build` - runs typescript compilation and docker build
 * `yarn compile` - compiles typescript and generates commonjs code into `.dist` directory

## Running the docker image

To run the docker image on your computer, NAS device etc, pull `irekk/salus-proxy` image. When creating a container, is recommended to expose the service under port 80 (container exposes the application via port 8080).
Then, provide following environment variables:
 * `SALUS_HOST` eg `192.168.1.2`
 * `SALUS_PORT` it should be `80`
 * `SALUS_EUID` A EUID code available on the gateway device
 * `AUTH_USERS` A semicolon separated list of user and password pairs eg `user2:pass2;user2:pass2`

If you want to introduce improvements, fork the repository.
