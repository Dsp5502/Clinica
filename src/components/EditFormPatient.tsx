import { useNavigate } from 'react-router-dom';

import { usePutPatientMutation } from '../store/api/patients/patientsApi';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  PatientRequest,
  PatientResponse,
} from '../interface/patient.interface';

import { alertToast } from '../helpers/AlertsToast';

type ErrorMessage = {
  data: {
    message: string;
  };
};

type Props = {
  patient: PatientResponse | undefined;
};

export const EditFormPatient = ({ patient }: Props) => {
  const [UpdatePatient, { isLoading }] = usePutPatientMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientRequest>({
    defaultValues: patient,
  });

  const onSubmit: SubmitHandler<PatientRequest> = async (data) => {
    try {
      const { name }: PatientResponse = await UpdatePatient({
        ...data,
        id: patient?._id as string,
      }).unwrap();
      alertToast(`Paciente ${name} Editado correctamente`, 'success');
      navigate('/patients');
    } catch (error) {
      alertToast((error as ErrorMessage).data.message, 'success');
    }
  };

  return (
    <>
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
          <p className='text-red-500 text-xs italic'>{errors.name?.message}</p>
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='last_name'>
            Apellido:
          </label>
          <input
            id='last_name'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Apellido del Paciente'
            {...register('last_name', {
              required: 'Campo requerido',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.last_name?.message}
          </p>
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='identification'>
            Documento de identidad:
          </label>
          <input
            id='identification'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50  opacity-80'
            placeholder='# Documento del Paciente'
            disabled={true}
            {...register('identification', { required: 'Campo requerido' })}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.identification?.message}
          </p>
        </div>

        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='age'>
            Edad:
          </label>
          <input
            id='age'
            type='number'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Edad del Paciente'
            {...register('age', {
              required: 'Campo requerido',
              min: { value: 1, message: 'Mínimo 1 año  ' },
              max: { value: 120, message: 'Máximo 120 años   ' },
            })}
          />
          <p className='text-red-500 text-xs italic'>{errors.age?.message}</p>
        </div>

        {/* <div className='mb-4'>
        <label className='text-gray-800' htmlFor='email'>
          E-mail:
        </label>
        <input
          id='email'
          type='email'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Email del Cliente'
          name='email'
        />
      </div> */}

        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='phone'>
            Teléfono:
          </label>
          <input
            id='phone'
            type='tel'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Teléfono del Paciente'
            {...register('phone', {
              required: 'Campo requerido',
              minLength: { value: 7, message: 'Mínimo 7 caracteres' },
              maxLength: { value: 15, message: 'Máximo 15 caracteres' },
              pattern: {
                value: /^[+]?[0-9 ()-]+$/,
                message: 'Solo números y caracteres especiales + ( ) -',
              },
            })}
          />
          <p className='text-red-500 text-xs italic'>{errors.phone?.message}</p>
        </div>
        <input
          type='submit'
          disabled={isLoading}
          className='mt-5 w-full bg-blue-800 hover:bg-blue-500 p-3 uppercase font-bold text-white text-lg'
          value={isLoading ? 'Editando...' : 'Editar Paciente'}
        />
      </form>
    </>
  );
};
