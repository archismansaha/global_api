ARG NODE_VERSION=22.3.0


FROM node:${NODE_VERSION}-alpine as base


WORKDIR /usr/src/


FROM base as deps


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci




FROM base as final



COPY . .


COPY --from=deps /usr/src/node_modules ./node_modules


RUN npm run build
EXPOSE 3000

CMD npm start
