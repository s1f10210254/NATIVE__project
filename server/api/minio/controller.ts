import {photoRepository} from '$/repository/photoRepository';
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
      const {file} = body;
      const fileBuffer = await file.toBuffer();
      const url = await photoRepository.uploadPhoto(fileBuffer, file.mimetype);
      return {status: 201, body: {message: 'アップロード成功', url}};
    } catch (error) {
      console.error(error);
      return {status: 500, body: {messages: 'アップロード失敗'}};
    }
  },
}));
