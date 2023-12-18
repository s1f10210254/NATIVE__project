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

// service/envValues.ts
var import_dotenv = __toESM(require("dotenv"));
var import_zod = require("zod");
import_dotenv.default.config();
var PORT = +import_zod.z.string().regex(/^\d+$/).parse(process.env.PORT);
var API_BASE_PATH = import_zod.z.string().startsWith("/").parse(process.env.API_BASE_PATH);
var CORS_ORIGIN = import_zod.z.string().url().parse(process.env.CORS_ORIGIN);
var FIREBASE_AUTH_EMULATOR_HOST = import_zod.z.string().optional().parse(process.env.FIREBASE_AUTH_EMULATOR_HOST);
var FIREBASE_SERVER_KEY = import_zod.z.string().parse(process.env.FIREBASE_SERVER_KEY);
var S3_ENDPOINT = import_zod.z.string().parse(process.env.S3_ENDPOINT ?? "");
var S3_BUCKET = import_zod.z.string().parse(process.env.S3_BUCKET ?? "");
var S3_ACCESS_KEY = import_zod.z.string().parse(process.env.S3_ACCESS_KEY ?? "");
var S3_SECRET_KEY = import_zod.z.string().parse(process.env.S3_SECRET_KEY ?? "");
var S3_REGION = import_zod.z.string().parse(process.env.S3_REGION ?? "");

// middleware/firebaseAdmin.ts
var import_firebase_admin = __toESM(require("firebase-admin"));
var firebaseAdmin = import_firebase_admin.default.initializeApp(
  FIREBASE_AUTH_EMULATOR_HOST !== void 0 ? { projectId: "emulator" } : { credential: import_firebase_admin.default.credential.cert(JSON.parse(FIREBASE_SERVER_KEY)) }
);
var getUserRecord = async (cookieVal) => {
  const auth = firebaseAdmin.auth();
  const idToken = await auth.verifySessionCookie(cookieVal ?? "", true).catch(() => null);
  return idToken && await auth.getUser(idToken.uid);
};

// service/idParsers.ts
var import_zod2 = require("zod");
var createIdParser = () => import_zod2.z.string();
var userIdParser = createIdParser();
var taskIdParser = createIdParser();

// repository/usersRepo.ts
var usersRepo = {
  recordToModel: (user) => ({
    id: userIdParser.parse(user.uid),
    email: user.email ?? "",
    displayName: user.displayName,
    photoURL: user.photoURL
  })
};

// api/me/$relay.ts
var import_velona = require("velona");
var import_zod3 = require("zod");
function defineHooks(hooks, cb) {
  return cb && typeof hooks !== "function" ? (0, import_velona.depend)(hooks, cb) : hooks;
}
function defineController(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona.depend)(methods, cb) : methods;
}

// api/me/hooks.ts
var hooks_default = defineHooks(() => ({
  preHandler: async (req, res) => {
    const user = await getUserRecord(req.cookies.session);
    if (!user) {
      res.status(401).send();
      return;
    }
    req.user = usersRepo.recordToModel(user);
  }
}));

// api/tasks/$relay.ts
var import_velona2 = require("velona");
var import_zod4 = require("zod");
function defineHooks2(hooks, cb) {
  return cb && typeof hooks !== "function" ? (0, import_velona2.depend)(hooks, cb) : hooks;
}
function defineController2(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona2.depend)(methods, cb) : methods;
}

// api/tasks/hooks.ts
var hooks_default2 = defineHooks2(() => ({
  preHandler: async (req, res) => {
    const user = await getUserRecord(req.cookies.session);
    if (!user) {
      res.status(401).send();
      return;
    }
    req.user = usersRepo.recordToModel(user);
  }
}));

// api/tasks/_taskId@string/validators.ts
var import_zod6 = require("zod");

// api/tasks/_taskId@string/$relay.ts
var import_velona3 = require("velona");
var import_zod5 = require("zod");
function defineValidators(validator) {
  return validator;
}
function defineController3(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona3.depend)(methods, cb) : methods;
}

// api/tasks/_taskId@string/validators.ts
var validators_default = defineValidators(() => ({
  params: import_zod6.z.object({ taskId: import_zod6.z.string() })
}));

// api/$relay.ts
var import_velona4 = require("velona");
var import_zod7 = require("zod");
function defineController4(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona4.depend)(methods, cb) : methods;
}

// api/controller.ts
var controller_default = defineController4(() => ({
  get: () => ({ status: 200, body: "" })
}));

// service/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// api/health/$relay.ts
var import_velona5 = require("velona");
var import_zod8 = require("zod");
function defineController5(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona5.depend)(methods, cb) : methods;
}

// api/health/controller.ts
var controller_default2 = defineController5(() => ({
  get: async () => ({
    status: 200,
    body: {
      server: "ok",
      db: await prismaClient.task.count().then(() => "ok").catch(() => "ng")
    }
  })
}));

// api/hi/$relay.ts
var import_velona6 = require("velona");
var import_zod9 = require("zod");
function defineController6(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona6.depend)(methods, cb) : methods;
}

// api/hi/controller.ts
var controller_default3 = defineController6(() => ({
  get: () => ({ status: 200, body: "Hello" })
}));

// api/me/controller.ts
var controller_default4 = defineController(() => ({
  get: ({ user }) => {
    return { status: 200, body: user };
  }
}));

// api/session/$relay.ts
var import_velona7 = require("velona");
var import_zod10 = require("zod");
function defineController7(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona7.depend)(methods, cb) : methods;
}

// api/session/controller.ts
var options = {
  httpOnly: true,
  secure: true,
  path: "/",
  sameSite: "none"
};
var controller_default5 = defineController7(() => ({
  post: {
    hooks: {
      preHandler: async (req, reply) => {
        const auth = firebaseAdmin.auth();
        const expiresIn = 60 * 60 * 24 * 5 * 1e3;
        const idToken = req.body?.idToken ?? "";
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        reply.setCookie("session", sessionCookie, {
          ...options,
          expires: new Date(Date.now() + expiresIn)
        });
      }
    },
    handler: () => {
      return { status: 200, body: { status: "success" } };
    }
  },
  delete: {
    hooks: {
      preHandler: async (req, reply) => {
        const auth = firebaseAdmin.auth();
        const sessionId = req.cookies.session ?? "";
        const decodedClaims = await auth.verifySessionCookie(sessionId).catch(() => null);
        if (decodedClaims)
          await auth.revokeRefreshTokens(decodedClaims.sub);
        reply.clearCookie("session", options);
      }
    },
    handler: () => {
      return { status: 200, body: { status: "success" } };
    }
  }
}));

// repository/tasksRepository.ts
var import_crypto = require("crypto");
var import_velona8 = require("velona");
var toModel = (prismaTask) => ({
  id: taskIdParser.parse(prismaTask.id),
  label: prismaTask.label,
  done: prismaTask.done,
  created: prismaTask.createdAt.getTime()
});
var getTasks = async (userId, limit) => {
  const prismaTasks = await prismaClient.task.findMany({
    where: { userId },
    take: limit,
    orderBy: { createdAt: "desc" }
  });
  return prismaTasks.map(toModel);
};
var createTask = async (userId, label) => {
  const prismaTask = await prismaClient.task.create({
    data: {
      id: (0, import_crypto.randomUUID)(),
      userId,
      done: false,
      label,
      createdAt: /* @__PURE__ */ new Date()
    }
  });
  return toModel(prismaTask);
};
var updateTaskByStringId = async (params) => {
  const prismaTask = await prismaClient.task.update({
    where: { id: params.taskId, userId: params.userId },
    data: params.partialTask
  });
  return toModel(prismaTask);
};
var deleteTaskByStringId = async (userId, taskId) => {
  const prismaTask = await prismaClient.task.delete({
    where: { id: taskId, userId }
  });
  return toModel(prismaTask);
};
var updateTaskByBrandedId = async (params) => {
  const prismaTask = await prismaClient.task.update({
    where: { id: params.taskId, userId: params.userId },
    data: params.partialTask
  });
  return toModel(prismaTask);
};
var deleteTaskByBrandedId = async (userId, taskId) => {
  const prismaTask = await prismaClient.task.delete({
    where: { id: taskId, userId }
  });
  return toModel(prismaTask);
};
var findManyTask = async (userId) => {
  return await prismaClient.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};
var getTasksWithDI = (0, import_velona8.depend)(
  { findManyTask },
  async ({ findManyTask: findManyTask2 }, userId) => {
    const prismaTasks = await findManyTask2(userId);
    return prismaTasks.map(toModel);
  }
);

// api/tasks/controller.ts
var import_zod11 = require("zod");
var controller_default6 = defineController2(() => ({
  get: async ({ user, query }) => ({
    status: 200,
    body: await getTasks(user.id, query?.limit)
  }),
  post: {
    validators: { body: import_zod11.z.object({ label: import_zod11.z.string() }) },
    handler: async ({ user, body }) => ({
      status: 201,
      body: await createTask(user.id, body.label)
    })
  },
  patch: {
    validators: {
      body: import_zod11.z.object({
        taskId: taskIdParser,
        label: import_zod11.z.string().optional(),
        done: import_zod11.z.boolean().optional()
      })
    },
    handler: async ({ user, body }) => {
      const task = await updateTaskByBrandedId({
        userId: user.id,
        taskId: body.taskId,
        partialTask: body
      });
      return { status: 204, body: task };
    }
  },
  delete: async ({ user, body }) => {
    const task = await deleteTaskByBrandedId(user.id, body.taskId);
    return { status: 204, body: task };
  }
}));

// api/tasks/di/$relay.ts
var import_velona9 = require("velona");
var import_zod12 = require("zod");
function defineController8(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona9.depend)(methods, cb) : methods;
}

// api/tasks/di/controller.ts
var controller_default7 = defineController8({ findManyTask }, (deps) => ({
  get: async ({ user }) => ({
    status: 200,
    body: await getTasksWithDI.inject(deps)(user.id)
  })
}));

// api/tasks/_taskId@string/controller.ts
var import_zod13 = require("zod");
var controller_default8 = defineController3(() => ({
  patch: {
    validators: {
      body: import_zod13.z.object({
        label: import_zod13.z.string().optional(),
        done: import_zod13.z.boolean().optional()
      })
    },
    handler: async ({ user, body, params }) => {
      const task = await updateTaskByStringId({
        userId: user.id,
        taskId: params.taskId,
        partialTask: body
      });
      return { status: 204, body: task };
    }
  },
  delete: async ({ user, params }) => {
    const task = await deleteTaskByStringId(user.id, params.taskId);
    return { status: 204, body: task };
  }
}));

// api/test/$relay.ts
var import_velona10 = require("velona");
var import_zod14 = require("zod");
function defineController9(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona10.depend)(methods, cb) : methods;
}

// api/test/controller.ts
var controller_default9 = defineController9(() => ({
  get: () => ({ status: 200, body: "Hello" })
}));

// api/test10/$relay.ts
var import_velona11 = require("velona");
var import_zod15 = require("zod");
function defineController10(methods, cb) {
  return cb && typeof methods !== "function" ? (0, import_velona11.depend)(methods, cb) : methods;
}

// api/test10/controller.ts
var controller_default10 = defineController10(() => ({
  get: () => ({ status: 200, body: "Hello" })
}));

// $server.ts
var parseNumberTypeQueryParams = (numberTypeParams) => (req, reply, done) => {
  const query = req.query;
  for (const [key, isOptional, isArray] of numberTypeParams) {
    const param = isArray ? query[`${key}[]`] ?? query[key] : query[key];
    if (isArray) {
      if (!isOptional && param === void 0) {
        query[key] = [];
      } else if (!isOptional || param !== void 0) {
        const vals = (Array.isArray(param) ? param : [param]).map(Number);
        if (vals.some(isNaN)) {
          reply.code(400).send();
          return;
        }
        query[key] = vals;
      }
      delete query[`${key}[]`];
    } else if (!isOptional || param !== void 0) {
      const val = Number(param);
      if (isNaN(val)) {
        reply.code(400).send();
        return;
      }
      query[key] = val;
    }
  }
  done();
};
var callParserIfExistsQuery = (parser) => (req, reply, done) => Object.keys(req.query).length ? parser(req, reply, done) : done();
var validatorCompiler = ({ schema }) => (data) => {
  const result = schema.safeParse(data);
  return result.success ? { value: result.data } : { error: result.error };
};
var validatorsToSchema = ({ query, ...validators }) => ({
  ...query !== void 0 ? { querystring: query } : {},
  ...validators
});
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
var server_default = (fastify, options2 = {}) => {
  const basePath = options2.basePath ?? "";
  const hooks_81jpt9 = hooks_default(fastify);
  const hooks_1hlvxfl = hooks_default2(fastify);
  const validators_1m4eoxd = validators_default(fastify);
  const controller_1qxyj9s = controller_default(fastify);
  const controller_vvrvb3 = controller_default2(fastify);
  const controller_1c8eilo = controller_default3(fastify);
  const controller_11w57lb = controller_default4(fastify);
  const controller_so5vkl = controller_default5(fastify);
  const controller_4j1ikj = controller_default6(fastify);
  const controller_c5qc1 = controller_default7(fastify);
  const controller_1o7e4u2 = controller_default8(fastify);
  const controller_14za1lp = controller_default9(fastify);
  const controller_awanum = controller_default10(fastify);
  fastify.get(basePath || "/", methodToHandler(controller_1qxyj9s.get));
  fastify.get(`${basePath}/health`, asyncMethodToHandler(controller_vvrvb3.get));
  fastify.get(`${basePath}/hi`, methodToHandler(controller_1c8eilo.get));
  fastify.get(
    `${basePath}/me`,
    {
      preHandler: hooks_81jpt9.preHandler
    },
    methodToHandler(controller_11w57lb.get)
  );
  fastify.post(
    `${basePath}/session`,
    {
      preHandler: controller_so5vkl.post.hooks.preHandler
    },
    methodToHandler(controller_so5vkl.post.handler)
  );
  fastify.delete(
    `${basePath}/session`,
    {
      preHandler: controller_so5vkl.delete.hooks.preHandler
    },
    methodToHandler(controller_so5vkl.delete.handler)
  );
  fastify.get(
    `${basePath}/tasks`,
    {
      preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([["limit", true, false]])),
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_4j1ikj.get)
  );
  fastify.post(
    `${basePath}/tasks`,
    {
      schema: validatorsToSchema(controller_4j1ikj.post.validators),
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_4j1ikj.post.handler)
  );
  fastify.patch(
    `${basePath}/tasks`,
    {
      schema: validatorsToSchema(controller_4j1ikj.patch.validators),
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_4j1ikj.patch.handler)
  );
  fastify.delete(
    `${basePath}/tasks`,
    {
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_4j1ikj.delete)
  );
  fastify.get(
    `${basePath}/tasks/di`,
    {
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_c5qc1.get)
  );
  fastify.patch(
    `${basePath}/tasks/:taskId`,
    {
      schema: {
        ...validatorsToSchema(controller_1o7e4u2.patch.validators),
        params: validators_1m4eoxd.params
      },
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_1o7e4u2.patch.handler)
  );
  fastify.delete(
    `${basePath}/tasks/:taskId`,
    {
      schema: {
        params: validators_1m4eoxd.params
      },
      validatorCompiler,
      preHandler: hooks_1hlvxfl.preHandler
    },
    asyncMethodToHandler(controller_1o7e4u2.delete)
  );
  fastify.get(`${basePath}/test`, methodToHandler(controller_14za1lp.get));
  fastify.get(`${basePath}/test10`, methodToHandler(controller_awanum.get));
  return fastify;
};

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
