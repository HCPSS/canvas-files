FROM nginx:alpine

LABEL maintainer="Nick Vissari <nvissari@hcpss.org>"

COPY www /usr/share/nginx/html
