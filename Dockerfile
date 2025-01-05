FROM node:22.11.0 AS build 

WORKDIR /usr/src/app 

COPY package*.json ./ 

RUN npm install 

COPY . . 

FROM node:22.11.0 AS runtime 

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

CMD [ "npm","run dev" ]