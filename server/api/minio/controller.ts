import {photoRepository} from '$/repository/photoRepository';
import {defineController} from './$relay';

export default defineController(() => ({
  get: async () => {
    try {
      const photos = await photoRepository.getPhotos();
      return {status: 200, body: {photos}};
    } catch (error) {
      console.error(error);
      return {status: 500, body: {photos: []}};
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
