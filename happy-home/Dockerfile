# ---------- BUILD STAGE ----------
FROM node:22-alpine AS build

WORKDIR /app

# 👇 Accept build-time variable from docker-compose
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Vite reads env at BUILD TIME
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# install curl (used by wait-for-backend) and remove default nginx config
RUN apk add --no-cache curl \
	&& rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy health-wait script and make executable
COPY wait-for-backend.sh /wait-for-backend.sh
RUN chmod +x /wait-for-backend.sh

EXPOSE 80

CMD ["/wait-for-backend.sh"]
