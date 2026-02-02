# ---------- BUILD STAGE ----------
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build production assets
RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
