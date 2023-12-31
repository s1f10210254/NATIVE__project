import {photoRepository} from '$/repository/photoRepository';
import axios from 'axios';
import {defineController} from './$relay';

export default defineController(() => ({
  get: async () => {
    try {
      const urls = await photoRepository.getPhotos();
      return {status: 200, body: urls};
    } catch (error) {
      console.error(error);
      return {status: 500, body: []};
    }
  },
  post: async ({body}) => {
    try {
      const {base64} = body;
      // console.log(base64);
      const fileBuffer = Buffer.from(base64, 'base64');
      const mimetype = 'image/jpeg';
      const url = await photoRepository.uploadPhoto(fileBuffer, mimetype);
      return {status: 201, body: {message: 'アップロード成功', url}};
    } catch (error) {
      console.error(error);
      return {status: 500, body: {message: 'アップロード失敗'}};
    }
  },
}));
