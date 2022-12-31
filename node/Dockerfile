FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/perfect-purpose-373314-ffb08d07405c.json"
CMD [ "node", "index.js" ]