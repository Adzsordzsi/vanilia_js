FROM node:16
WORKDIR /Users/adamgergo/Documents
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]