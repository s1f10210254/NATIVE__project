import type {DefineMethods} from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string[];
  };
  // post: {
  //   reqFormat: FormData;
  //   reqBody: {
  //     file: Blob;
  //   };
  //   resBody: {
  //     url: string;
  //   };
  // };
  post: {
    reqFormat: FormData;
    reqBody: {
      base64: string;
    };
    resBody: {
      url: string;
    };
  };
}>;
