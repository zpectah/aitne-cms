import { AriaAttributes, ComponentPropsWithRef, ElementType, HTMLAttributes } from 'react';

export type ElementProps<E extends ElementType> = ComponentPropsWithRef<E>;
export type ElementRestProps<E> = Partial<HTMLAttributes<E>> & Partial<AriaAttributes>;
