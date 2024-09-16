# Step 1: Use a node image as the base image
FROM node:18-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Step 4: Install dependencies using Yarn
RUN yarn install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the application (this will generate static files in /build)
RUN yarn build

# Step 7: Use nginx to serve the static files in production
FROM nginx:alpine

# Step 8: Copy the built frontend files to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port nginx will run on
EXPOSE 80

# Step 10: Start nginx
CMD ["nginx", "-g", "daemon off;"]
