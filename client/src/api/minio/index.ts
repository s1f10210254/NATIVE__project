import type {DefineMethods} from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: {
      photos: Array<{
        title: string;
        url: string;
        description?: string;
      }>;
    };
  };
  post: {
    reqFormat: FormData;
    reqBody: {
      file: Blob;
    };
    resBody: {
      url: string;
    };
  };
}>;
