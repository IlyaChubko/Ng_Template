FROM alpine:3.13.3
RUN apk add --update nginx && rm -rf /var/cache/apk/*
COPY nginx.non-root.conf /etc/nginx/nginx.conf
COPY dist/app-serve /usr/share/nginx/html
RUN nginx -t
EXPOSE 80
VOLUME ["/usr/share/nginx/html"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
