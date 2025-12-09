import Fastify, { FastifyRequest } from "fastify";
import FastifyStatic from "@fastify/static";

import path from "node:path";
import os from "node:os";

const fastify = Fastify({
  logger: true
});

const htmlTemplate = (request: FastifyRequest) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello, ZeroTier!</title>
  <link rel="stylesheet" href="/public/pico.min.css" />
</head>
<body>
  <main class="container">
    <section>
      <p><img src="/public/zt-logo.svg"></p>
    </section>
    <section>
      <h1>Hello, ${request.ip}! My name is ${os.hostname()}.</h1>
    </section>
  </div>
</body>
</html>
`;

const staticContentDir = path.resolve(path.join(__dirname, "public"));
console.log({ staticContentDir });

fastify.register(FastifyStatic, {
  root: staticContentDir,
  prefix: "/public/",
});

fastify.get("/", async (request, reply) => {
  reply.type("text/html").send(htmlTemplate(request));
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
