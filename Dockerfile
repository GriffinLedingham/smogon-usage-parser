FROM node:carbon

WORKDIR /usage-parser
COPY package.json package.json
RUN npm install

COPY . .

RUN npm run tsc
