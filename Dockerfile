FROM node:15
RUN apt-get update && apt-get install -y ffmpeg
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "index.js" ]
