# Use a Node image with libraries (avoid slim)
FROM node:22-bullseye

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json ./

# Install dependencies (reproducible)
RUN npm ci --legacy-peer-deps

# Copy app source
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev"]
