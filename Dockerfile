# Base Node
FROM node:16 AS base
# Direct Setting
WORKDIR /treasure-blog
# Package Copy
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
FROM nginx as production
RUN mkdir /treasure-blog
COPY --from=base /treasure-blog/dist /treasure-blog
COPY nginx.conf /etc/nginx/nginx.conf