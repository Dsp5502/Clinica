import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  return (
    <div className='space-y-8 '>
      <h1 className='text-center text-6xl font-extrabold mt-20 text-blue-900'>
        CRM - CLinica
      </h1>
      <p className='text-center '>
        Hubo un error al cargar la página, por favor intente nuevamente
      </p>
      <p className='text-center '>{error.message}</p>
    </div>
  );
};
