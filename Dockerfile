# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Yarn
RUN npm install -g yarn

# Copy package.json and yarn.lock (if present)
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application files
COPY . .

# Expose the port that the app will run on
EXPOSE 4000

# Set the default command to run migrations and then start the app
CMD ["sh", "-c", "yarn run migrate && yarn start"]
