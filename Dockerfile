FROM node:carbon
COPY ./ /app
WORKDIR /app
RUN npm install
EXPOSE 9000
CMD ["node", "app.js"]
