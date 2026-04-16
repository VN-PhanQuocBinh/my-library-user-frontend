# Stage 1: Build
FROM node:24.12-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:24.12-slim

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy only the built files from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]