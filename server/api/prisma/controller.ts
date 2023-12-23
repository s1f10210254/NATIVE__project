import {getUser} from '$/repository/DbRepository';
import {prismaClient} from '$/service/prismaClient';
import {defineController} from './$relay';

export default defineController(() => ({
  get: async () => {
    try {
      const users = await getUser();
      return {status: 200, body: users};
    } catch (error) {
      return {status: 500, body: []};
    }
  },
}));
