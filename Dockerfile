FROM node:22-alpine

ENV PORT=8080
ENV SALUS_HOST=
ENV SALUS_PORT=80
ENV SALUS_EUID=
ENV AUTH_USERS=:

COPY ./.dist /app
COPY ./node_modules /app/node_modules

WORKDIR /app

EXPOSE 8080
CMD [ "node", "./index.js" ]