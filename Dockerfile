# Use node 16 alpine image as base image
FROM node:16-alpine as base

# Create work directory in app folder
WORKDIR /app

# Copy over package.json files
COPY package.json /app/
COPY package-lock.json /app/

# Install all dependencies
RUN npm ci && npm cache clean --force

# Copy over all files to the work directory
COPY . /app

# Build the project
RUN npm run build

# Use node 16 alpine image as app image
FROM node:16-alpine as app

# Copy over build files from base image
COPY --from=base /app/.output /app/.output

# Expose the host and port 3000 to the server
ENV HOST 0.0.0.0
EXPOSE 3000

# Run the build project with node
CMD [ "node", "/app/.output/server/index.mjs" ]

# Use mysql 8.0 image as db image
FROM mysql:8.0 as db

# Set a password for the root user
ENV MYSQL_ROOT_PASSWORD secret

# Create a database and a user for the app
ENV MYSQL_DATABASE rails_db
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password

# Expose the port 3306 to the server
EXPOSE 3306
