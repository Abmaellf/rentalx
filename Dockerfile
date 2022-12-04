FROM node

WORKDIR /home/abmael/Projetos

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]