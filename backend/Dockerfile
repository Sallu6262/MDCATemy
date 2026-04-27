# Use official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your backend runs on (assuming 5000, change if different)
EXPOSE 5000

# Command to run your backend 
# (Make sure your backend package.json has a "start" script, e.g., "start": "node index.js")
CMD ["npm", "start"]
