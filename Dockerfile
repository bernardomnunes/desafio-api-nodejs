# Vai usar a imagem do node em uma versao reduzida e chama-la de builder
FROM node:22-alpine AS builder

# Vai criar uma pasta dentro do SO
WORKDIR /app

# Vai copiar o package.json e lockjson para dentro da pasta app
COPY . ./

# Vai instalar as dependencias do packagelock
RUN npm ci --only=production

# A aplicacao roda na porta 3333
EXPOSE 3333 

CMD ["node", "src/server.ts"]

