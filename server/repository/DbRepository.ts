import {prismaClient} from '$/service/prismaClient';

export const getUser = async () => {
  const id = prismaClient.user.findMany();
  return id;
};

export const getTask = async () => {
  const task = prismaClient.task.findMany();
  return task;
};
