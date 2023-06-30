import { ChangeEvent, useState } from 'react';

export const useForm = <T extends object>(initState: T) => {
  const [formulario, setFormulario] = useState(initState);

  const handlerChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return {
    formulario,
    handlerChange,
    ...formulario,
  };
};
