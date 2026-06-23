FROM node:24.17.0-alpine

WORKDIR /usr/src/app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Make start script executable
RUN chmod +x start.sh

EXPOSE 3000

# Use the start script to run migrations before starting
CMD ["sh", "./start.sh"]
