# Install node
FROM node:14

RUN apt update -y

# Set the workdir /app
WORKDIR /app

# Frontend
# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install --legacy-peer-deps

# Copy application source
COPY . .

EXPOSE 8080

# Start the application
CMD ["npm", "run", "serve"]