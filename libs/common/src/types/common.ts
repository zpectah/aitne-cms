import { ElementType, ComponentPropsWithRef } from 'react';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PolymorphicComponentPropsWithRef<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithRef<T>;
