# Use official Node.js image as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that your app will run on
EXPOSE 4000

# Run migrations first and then start the application
CMD npm run migrate && npm start
