import { SubmitHandler, useForm } from 'react-hook-form';
import { UserRegisterRequest } from '../interface/user.interface';
import { Link, useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../store/api/user/userApi';
import { useAppDispatch } from '../hooks/hooks';
import { setCredentials } from '../store/slices/user/userSlice';
import { alertToast } from '../helpers/AlertsToast';

const formInit: UserRegisterRequest = {
  email: '',
  password: '',
  name: '',
  role: 'USER_ROLE',
};

type ErrorMessage = {
  data: {
    message: string;
  };
};

export const RegisterPage = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterRequest>({
    defaultValues: formInit,
  });

  const onSubmit: SubmitHandler<UserRegisterRequest> = async (
    data: UserRegisterRequest
  ) => {
    try {
      const userRegister = await registerUser(data).unwrap();
      const user = await login({
        email: userRegister.email,
        password: data.password,
      }).unwrap();
      localStorage.setItem('authToken', user.token);
      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      alertToast((err as ErrorMessage).data.message, 'error');
    }
  };

  return (
    <div className='bg-blue-800 w-full h-screen flex justify-center flex-col items-center'>
      <h1 className='text-white text-6xl font-black'>CRM - Clinica</h1>

      <div className='bg-white shadow rounded-md md:w-1/4 mx-auto px-5 py-10 mt-20'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='text-gray-800' htmlFor='name'>
              Nombre:
            </label>
            <input
              id='name'
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Nombre del Paciente'
              {...register('name', {
                required: 'Campo requerido',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
              })}
            />
            <p className='text-red-500 text-xs italic'>
              {errors.name?.message}
            </p>
          </div>
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
            <p className='text-red-500 text-xs italic'>
              {errors.email?.message}
            </p>
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
          <div className='mb-4'>
            <label className='text-gray-800' htmlFor='role'>
              Rol:
            </label>
            <select
              id='role'
              className='mt-2 block w-full p-3 bg-gray-50'
              {...register('role', {
                required: 'Campo requerido',
              })}
            >
              <option value='USER_ROLE'>Usuario</option>
              <option value='ADMIN_ROLE'>Administrador</option>
            </select>
            <p className='text-red-500 text-xs italic'>
              {errors.role?.message}
            </p>
          </div>
          {/* //¡Ya tengo una cuenta! */}

          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value={'Registar' + (isLoading || isRegisterLoading ? '...' : '')}
          />
        </form>
        <div className='flex justify-end mt-4'>
          <Link
            to='/login'
            className='text-blue-500 hover:text-blue-700 font-semibold hover:underline'
          >
            ¡Ya tengo una cuenta!
          </Link>
        </div>
      </div>
    </div>
  );
};
