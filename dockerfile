FROM node:18 AS base
RUN apt-get update  \
    && apt-get upgrade -y \
    && apt-get install -y openssl  \
    && apt-get clean -y \
    && rm -rf /root/.cache \
    && rm -rf /var/apt/lists/* \
    && rm -rf /var/cache/apt/*

WORKDIR /app/

COPY package.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

# RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

