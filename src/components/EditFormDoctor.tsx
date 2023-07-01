import { useNavigate } from 'react-router-dom';

import { usePutDoctorMutation } from '../store/api/doctors/doctorsApi';

import { SubmitHandler, useForm } from 'react-hook-form';

import { DoctorRequest, DoctorResponse } from '../interface/doctor.interface';
import { alertToast } from '../helpers/AlertsToast';
import { useAppSelector } from '../hooks/hooks';

type ErrorMessage = {
  data: {
    message: string;
  };
};

type Props = {
  doctor: DoctorResponse | undefined;
};

export const EditFormDoctor = ({ doctor }: Props) => {
  const [UpdateDoctor, { isLoading }] = usePutDoctorMutation();

  const navigate = useNavigate();

  const { patients: specialities } = useAppSelector(
    (state) => state.specialities
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorRequest>({
    defaultValues: doctor,
  });

  const onSubmit: SubmitHandler<DoctorRequest> = async (data) => {
    try {
      const { firstName }: DoctorResponse = await UpdateDoctor({
        ...data,
        id: doctor?._id as string,
      }).unwrap();
      alertToast(`Doctor ${firstName} Editado correctamente`, 'success');
      navigate('/doctors');
    } catch (error) {
      alertToast((error as ErrorMessage).data.message, 'error');
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
            id='firstName'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Nombre del Doctor'
            {...register('firstName', {
              required: 'Campo requerido',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.firstName?.message}
          </p>
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='last_name'>
            Apellido:
          </label>
          <input
            id='lastName'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Apellido del Doctor'
            {...register('lastName', {
              required: 'Campo requerido',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.lastName?.message}
          </p>
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='last_name'>
            Especialidad:
          </label>
          <select
            id='specialtyId'
            className='mt-2 block w-full p-3 bg-gray-50'
            {...register('specialtyId', {
              required: 'Campo requerido',
            })}
          >
            <option value=''>Seleccione una especialidad</option>
            {specialities?.map((speciality) => (
              <option key={speciality._id} value={speciality._id}>
                {speciality.title}
              </option>
            ))}
          </select>
          <p className='text-red-500 text-xs italic'>
            {errors.lastName?.message}
          </p>
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='identification'>
            Oficina:
          </label>
          <input
            id='office'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Oficina del Doctor'
            {...register('office', { required: 'Campo requerido' })}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.office?.message}
          </p>
        </div>

        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='email'>
            E-mail:
          </label>
          <input
            id='contactEmail'
            type='email'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Email del Doctor'
            {...register('contactEmail', {
              required: 'Campo requerido',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Email inválido',
              },
            })}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.contactEmail?.message}
          </p>
        </div>

        <input
          type='submit'
          disabled={isLoading}
          className='mt-5 w-full bg-blue-800 hover:bg-blue-500 p-3 uppercase font-bold text-white text-lg'
          value={isLoading ? 'Guardando...' : 'Registrar Doctor'}
        />
      </form>
    </>
  );
};
