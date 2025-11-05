FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm install -g expo-cli
EXPOSE 8081
CMD ["npm", "start"]