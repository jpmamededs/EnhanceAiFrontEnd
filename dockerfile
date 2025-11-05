from node:18
WORKDIR /app
copy package*.json ./
RUN npm install
copy . .
RUN npm install -g expo-cli
EXPOSE 8081
CMD ["npm", "start"]