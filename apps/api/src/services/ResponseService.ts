import { ParsedQs } from 'qs';

type IResponseServiceParams = {
  version?: string | undefined;
} & {
  environment?: string | undefined;
} & {
  model?: string | undefined;
} & {
  type?: string | undefined;
} & {
  mod1?: string | undefined;
} & {
  mod2?: string | undefined;
} & {
  mod3?: string | undefined;
};

interface IResponseService {
  params: IResponseServiceParams;
  query: ParsedQs;
}

const ResponseService = ({ params, query }: IResponseService) => {
  const { version, environment, model, type, mod1, mod2, mod3 } = params;

  return {
    message: 'Welcome to api!',
    version,
    environment,
    model,
    type,
    mod1,
    mod2,
    mod3,
    query,
  };
};

export default ResponseService;
