"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// api/$relay.ts
var import_velona = require("velona");
var import_zod = require("zod");
function defineController(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona.depend)(methods, cb) : methods;
}

// api/controller.ts
var controller_default = defineController(() => ({
  get: () => ({ status: 200, body: "" })
}));

// service/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// api/health/$relay.ts
var import_velona2 = require("velona");
var import_zod2 = require("zod");
function defineController2(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona2.depend)(methods, cb) : methods;
}

// api/health/controller.ts
var controller_default2 = defineController2(() => ({
  get: async () => ({
    status: 200,
    body: {
      server: "ok",
      db: await prismaClient.task.count().then(() => "ok").catch(() => "ng")
    }
  })
}));

// api/hi/$relay.ts
var import_velona3 = require("velona");
var import_zod3 = require("zod");
function defineController3(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona3.depend)(methods, cb) : methods;
}

// api/hi/controller.ts
var controller_default3 = defineController3(() => ({
  get: () => ({ status: 200, body: "Hello" })
}));

// $server.ts
var methodToHandler = (methodCallback) => (req, reply) => {
  const data = methodCallback(req);
  if (data.headers !== void 0)
    reply.headers(data.headers);
  reply.code(data.status).send(data.body);
};
var asyncMethodToHandler = (methodCallback) => async (req, reply) => {
  const data = await methodCallback(req);
  if (data.headers !== void 0)
    reply.headers(data.headers);
  reply.code(data.status).send(data.body);
};
var server_default = (fastify, options = {}) => {
  const basePath = options.basePath ?? "";
  const controller_1qxyj9s = controller_default(fastify);
  const controller_vvrvb3 = controller_default2(fastify);
  const controller_1c8eilo = controller_default3(fastify);
  fastify.get(basePath || "/", methodToHandler(controller_1qxyj9s.get));
  fastify.get(`${basePath}/health`, asyncMethodToHandler(controller_vvrvb3.get));
  fastify.get(`${basePath}/hi`, methodToHandler(controller_1c8eilo.get));
  return fastify;
};

// service/envValues.ts
var import_dotenv = __toESM(require("dotenv"));
var import_zod4 = require("zod");
import_dotenv.default.config();
var PORT = +import_zod4.z.string().regex(/^\d+$/).parse(process.env.PORT);
var API_BASE_PATH = import_zod4.z.string().startsWith("/").parse(process.env.API_BASE_PATH);
var CORS_ORIGIN = import_zod4.z.string().url().parse(process.env.CORS_ORIGIN);
var FIREBASE_AUTH_EMULATOR_HOST = import_zod4.z.string().optional().parse(process.env.FIREBASE_AUTH_EMULATOR_HOST);
var FIREBASE_SERVER_KEY = import_zod4.z.string().parse(process.env.FIREBASE_SERVER_KEY);
var S3_ENDPOINT = import_zod4.z.string().parse(process.env.S3_ENDPOINT ?? "");
var S3_BUCKET = import_zod4.z.string().parse(process.env.S3_BUCKET ?? "");
var S3_ACCESS_KEY = import_zod4.z.string().parse(process.env.S3_ACCESS_KEY ?? "");
var S3_SECRET_KEY = import_zod4.z.string().parse(process.env.S3_SECRET_KEY ?? "");
var S3_REGION = import_zod4.z.string().parse(process.env.S3_REGION ?? "");

// service/app.ts
var import_cookie = __toESM(require("@fastify/cookie"));
var import_cors = __toESM(require("@fastify/cors"));
var import_helmet = __toESM(require("@fastify/helmet"));
var import_fastify = __toESM(require("fastify"));
var init = (serverFactory) => {
  const app = (0, import_fastify.default)({ serverFactory });
  app.register(import_helmet.default);
  app.register(import_cors.default, { origin: CORS_ORIGIN, credentials: true });
  app.register(import_cookie.default);
  server_default(app, { basePath: API_BASE_PATH });
  return app;
};

// entrypoints/index.ts
init().listen({ port: PORT, host: "0.0.0.0" });
