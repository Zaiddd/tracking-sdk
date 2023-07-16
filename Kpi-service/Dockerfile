# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install && npm install --save amqplib && npm install --save amqp-connection-manager

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["npm", "run", "start:dev"]