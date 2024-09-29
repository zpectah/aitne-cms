import config from '../../../../config';

export const useFooter = () => ({
  cms: `${config.cms.meta.name} v${config.cms.meta.version}`,
  copyrightText: `All rights reserved`,
});
