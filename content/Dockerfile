FROM node
ADD package.json ./
RUN npm install
ADD app.js /app.js
ENTRYPOINT ["node", "app.js"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080 || exit 1
