import {photoRepository} from '$/repository/photoRepository';
import {defineController} from './$relay';

export default defineController(() => ({
  get: () => ({status: 200, body: 'Hello'}),
  post: async ({body}) => {
    try {
      const {blob} = body;
      const fileBuffer = await blob.toBuffer();
      const url = await photoRepository.uploadPhotoBlob(
        fileBuffer,
        blob.mimetype,
      );
      return {status: 201, body: url};
    } catch (error) {
      console.error(error);
      return {status: 500, body: 'アップロード失敗'};
    }
  },
}));
