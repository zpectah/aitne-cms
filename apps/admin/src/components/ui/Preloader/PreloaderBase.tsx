import { WithChildren } from '@common';

export interface PreloaderBaseProps extends WithChildren {
  type?: string; // TODO
}

const PreloaderBase = ({ children, type }: PreloaderBaseProps) => <div>...PreloaderBase...by type...{children}...</div>;

export default PreloaderBase;
