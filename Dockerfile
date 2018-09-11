#base image
FROM node:alpine

LABEL manteiner.name="Adrian Lemes"
LABEL manteiner.email="adrianlemess@gmail.com"

# Install chromium
RUN apk add --update --no-cache chromium

# Work Directory
WORKDIR /var/www/app

# Install Angular to use ng-cli
RUN npm install -g @angular/cli

# Expose ports 4200 to dev and 49153 to live reload
EXPOSE 4200 49153

# Copy files project to the container
COPY . /var/www/app

# start container with
CMD [ "npm", "install" ]
