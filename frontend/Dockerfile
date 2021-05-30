FROM node:14.15.4-alpine3.10

# npm install を行うので、それに必要な package.json がある階層を指定
WORKDIR /random-quiz/frontend/random-quiz
COPY ./random-quiz/package.json /random-quiz/frontend/random-quiz/package.json

RUN npm install

CMD ["npm", "start"]