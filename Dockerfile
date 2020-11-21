# Define Base Image
FROM telkomindonesia/alpine:nodejs-8.9.3

# Change Working Directory
WORKDIR /usr/src/app

# Copy Package Dependencies List to Working Directory
COPY package*.json /usr/src/app/

# Install Package Dependencies
RUN apk add --update --no-cache --virtual .build-dev \
      build-base \
      python python-dev \
    && npm i -g npm \
    && npm i -g node-gyp \
    && npm i \
    && apk del .build-dev

# Copy All Source Code to Working Directory
COPY . /usr/src/app/

# Expose Application Port
EXPOSE 9000

# Run Application
CMD ["npm", "start"]
