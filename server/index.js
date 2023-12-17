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

// node_modules/velona/dist/esm/index.js
var depend = (dependencies, cb) => {
  const fn = (...args) => cb(dependencies, ...args);
  fn.inject = (deps) => typeof deps === "function" ? depend({ ...dependencies, ...deps(dependencies) }, cb) : depend({ ...dependencies, ...deps }, cb);
  return fn;
};

// api/$relay.ts
var import_zod = require("zod");
function defineController(methods, cb) {
  return cb && typeof methods !== "function" ? depend(methods, cb) : methods;
}

// api/controller.ts
var controller_default = defineController(() => ({
  get: () => ({ status: 200, body: "\u901A\u3063\u305F\u3088\u304A\u304A\u304A\u304A\u304A" })
}));

// api/health/$relay.ts
var import_zod2 = require("zod");
function defineController2(methods, cb) {
  return cb && typeof methods !== "function" ? depend(methods, cb) : methods;
}

// api/health/controller.ts
var controller_default2 = defineController2(() => ({
  get: () => ({ status: 200, body: { hello: "helth" } })
}));

// api/test/$relay.ts
var import_zod3 = require("zod");
function defineController3(methods, cb) {
  return cb && typeof methods !== "function" ? depend(methods, cb) : methods;
}

// api/test/controller.ts
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
var server_default = (fastify, options = {}) => {
  const basePath = options.basePath ?? "";
  const controller_1qxyj9s = controller_default(fastify);
  const controller_vvrvb3 = controller_default2(fastify);
  const controller_14za1lp = controller_default3(fastify);
  fastify.get(basePath || "/", methodToHandler(controller_1qxyj9s.get));
  fastify.get(`${basePath}/health`, methodToHandler(controller_vvrvb3.get));
  fastify.get(`${basePath}/test`, methodToHandler(controller_14za1lp.get));
  return fastify;
};

// service/envValues.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var PORT = +(process.env.PORT ?? "8080");
var API_BASE_PATH = process.env.API_BASE_PATH ?? "";
var API_ORIGIN = process.env.API_ORIGIN ?? "";
var CORS_ORIGIN = process.env.CORS_ORIGIN ?? "";
var FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST;
var FIREBASE_SERVER_KEY = process.env.FIREBASE_SERVER_KEY ?? "";
var TWITTER_USERNAME = process.env.TWITTER_USERNAME ?? "";
var TWITTER_PASSWORD = process.env.TWITTER_PASSWORD ?? "";

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
