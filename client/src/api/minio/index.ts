import type {DefineMethods} from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string[];
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
