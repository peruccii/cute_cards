FROM node:18

WORKDIR /app
COPY prisma ./

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
