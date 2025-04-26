FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install electron --save-dev
RUN npm run electron-rebuild
CMD ["npx", "electron", "."]
