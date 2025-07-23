# Dockerfile for Next.js App

# 1. Base Image - Use a Node.js image
FROM node:20-alpine AS base

# 2. Set up the working directory
WORKDIR /app

# 3. Install dependencies
# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# 4. Copy application code
COPY . .

# 5. Build the application
# This command will build the Next.js app for production
RUN npm run build

# 6. Configure the container to run the app
# Expose the port the app will run on. Default is 3000 for Next.js
EXPOSE 3000

# Set the command to start the app
# 'npm start' will run 'next start' which is the production server
CMD ["npm", "start"]
