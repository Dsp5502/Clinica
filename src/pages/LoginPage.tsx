import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';

import { setCredentials } from '../store/slices/user/userSlice';

import { useLoginMutation } from '../store/api/user/userApi';

import { UserRequest } from '../interface/user.interface';

import { alertToast } from '../helpers/AlertsToast';

const formInit: UserRequest = {
  email: '',
  password: '',
};

type ErrorMessage = {
  data: {
    message: string;
  };
};

export const LoginPage = () => {
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log([{ isLoading }, { isError }, { isSuccess }, { data }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequest>({
    defaultValues: formInit,
  });

  const onSubmit: SubmitHandler<UserRequest> = async (data: UserRequest) => {
    try {
      const user = await login(data).unwrap();
      localStorage.setItem('authToken', user.token);
      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      alertToast((err as ErrorMessage).data.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label className='text-gray-800' htmlFor='email'>
          E-mail:
        </label>
        <input
          id='email'
          type='email'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Email del Usuario'
          {...register('email', {
            required: 'Campo requerido',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Email inválido',
            },
          })}
        />
        <p className='text-red-500 text-xs italic'>{errors.email?.message}</p>
      </div>
      <div className='mb-4'>
        <label className='text-gray-800' htmlFor='last_name'>
          Contraseña:
        </label>
        <input
          id='password'
          type='password'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Contraseña del Usuario'
          {...register('password', {
            required: 'Campo requerido',
          })}
        />
        <p className='text-red-500 text-xs italic'>
          {errors.password?.message}
        </p>
      </div>

      <input
        type='submit'
        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
        value={'Ingresar' + (isLoading ? '...' : '')}
      />
    </form>
  );
};
