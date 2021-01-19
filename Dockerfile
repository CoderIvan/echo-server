FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm i --production \
  && npm i pkg -g \
  && npm run pkg

FROM alpine
WORKDIR /app
RUN echo "https://mirrors.aliyun.com/alpine/latest-stable/main/" > /etc/apk/repositories
RUN apk add tzdata --update --no-cache \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" /etc/localtime \
  && apk del tzdata \
  && apk add --no-cache libstdc++
COPY --from=build-stage /app/executable /app
CMD ./executable
EXPOSE 80
EXPOSE 90/udp
