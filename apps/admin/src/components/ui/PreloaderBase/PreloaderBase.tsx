import { WithChildren } from '@common';

export interface PreloaderBaseProps extends WithChildren {
  type?: string; // TODO
}

const PreloaderBase = ({ children, type }: PreloaderBaseProps) => <>...PreloaderBase...by type...{children}...</>;

export default PreloaderBase;
