import { ElementProps } from '@common';

export type FormProps = ElementProps<'form'>;

const Form = ({ ...props }: FormProps) => <form {...props} />;

export default Form;
