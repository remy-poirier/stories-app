export interface Params {
  isProd: boolean;
}

const isProd: boolean = process.env.NODE_ENV === "production";

/**
 * @desc Get some data about app, some will come from app and some will be injected by
 * this method.
 */
const getParams = (): Params => {
  return {
    isProd: isProd
  };
};

export const config = getParams();
