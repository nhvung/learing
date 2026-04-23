FROM node:20-alpine
WORKDIR /data/viewer
COPY package.json .
RUN npm install --omit=dev
COPY server.js .
COPY public ./public
EXPOSE 3333
CMD ["node", "server.js"]
