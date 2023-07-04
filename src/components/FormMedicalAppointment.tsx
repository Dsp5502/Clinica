import { useEffect, useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import ReactDatePicker from 'react-datepicker';

import { useAppSelector } from '../hooks/hooks';

import { useGetAllDoctorsQuery } from '../store/api/doctors/doctorsApi';
import { useGetAllPatientsQuery } from '../store/api/patients/patientsApi';
import { usePostMedicalAppointmentMutation } from '../store/api/medicalAppointment/medicalAppointmentApi';

import { MedicalAppointmentRequest } from '../interface/medicalAppointment.interface';

import { AllPatients } from '../types/patient.types';
import { DoctorsResponse } from '../types/doctors.types';

import { alertToast } from '../helpers/AlertsToast';
import {
  filterTime,
  handleColor,
  maxiTime,
  minDate,
  miniTime,
} from '../helpers/ValidationsDate';

type ErrorMessage = {
  data: {
    message: string;
  };
};

const formInit: MedicalAppointmentRequest = {
  documentPatient: '',
  specialtyId: '',
  appointmentDate: '',
  doctorId: '',
  patientId: '',
};

export const FormMedicalAppointment = () => {
  const navigate = useNavigate();

  const [doctorsApi, setdoctorsApi] = useState<DoctorsResponse>();
  const [patientApi, setPatientApi] = useState<AllPatients>();

  const { patients: specialities } = useAppSelector(
    (state) => state.specialities
  );

  const { data: doctors } = useGetAllDoctorsQuery({
    limit: 50,
    skip: 0,
  });

  const { data: patients } = useGetAllPatientsQuery({
    limit: 50,
    skip: 0,
  });

  const [addAppointment, { isLoading }] = usePostMedicalAppointmentMutation();

  useEffect(() => {
    if (doctors) {
      setdoctorsApi(doctors);
    }
  }, [doctors]);

  useEffect(() => {
    if (patients) {
      setPatientApi(patients);
    }
  }, [patients]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MedicalAppointmentRequest>({
    defaultValues: formInit,
  });

  const filterDoctors = (specialtyId: string) => {
    const doctorsFiltered = doctorsApi?.doctors.filter(
      (doctor) => doctor.specialtyId === specialtyId
    );
    return doctorsFiltered;
  };

  const onSubmit: SubmitHandler<MedicalAppointmentRequest> = async (data) => {
    try {
      data = {
        ...data,
        patientId:
          patientApi?.patients?.find(
            (patient) => patient.identification === data.documentPatient
          )?._id || '',
      };
      console.log(data);
      const { _id } = await addAppointment(data).unwrap();
      alertToast(`Cita con ${_id} creada correctamente`, 'success');
      navigate('/medicalAppointment');
    } catch (error) {
      alertToast((error as ErrorMessage).data.message, 'success');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='documentPatient'>
            Paciente:
          </label>
          <select
            id='documentPatient'
            className='mt-2 block w-full p-3 bg-gray-50'
            {...register('documentPatient', {
              required: 'Campo requerido',
            })}
          >
            <option value=''>Seleccione un paciente</option>
            {patientApi?.patients?.map((patient) => (
              <option key={patient._id} value={patient.identification}>
                {patient.name} {patient.last_name}
              </option>
            ))}
          </select>
          <p className='text-red-500 text-xs italic'>
            {errors.documentPatient?.message}
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
            {errors.specialtyId?.message}
          </p>
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='doctorId'>
            Doctor:
          </label>
          <select
            id='doctorId'
            className='mt-2 block w-full p-3 bg-gray-50'
            {...register('doctorId', {
              required: 'Campo requerido',
            })}
            disabled={!watch('specialtyId')}
          >
            <option value=''>Seleccione un doctor</option>
            {filterDoctors(watch('specialtyId'))?.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
          <p className='text-red-500 text-xs italic'>
            {errors.doctorId?.message}
          </p>
        </div>

        <div className='mb-4'>
          <label className='text-gray-800 block' htmlFor='last_name'>
            Fecha de la cita:
          </label>
          <Controller
            control={control}
            name='appointmentDate'
            render={({ field }) => (
              <ReactDatePicker
                id='appointmentDate'
                showTimeSelect
                placeholderText='Seleccione una fecha'
                onChange={(date) => field.onChange(date?.toString() ?? '')}
                selected={field.value ? new Date(field.value) : null}
                timeClassName={handleColor}
                minDate={minDate}
                dateFormat='MMMM d, yyyy h:mm aa'
                className='mt-2 block w-full p-3 bg-gray-50'
                minTime={miniTime}
                maxTime={maxiTime}
                locale={es}
                filterTime={(time) =>
                  filterTime(Date.parse(watch('appointmentDate')), time)
                }
                required
              />
            )}
          />
          <p className='text-red-500 text-xs italic'>
            {errors.appointmentDate?.message}
          </p>
        </div>
        <input
          type='submit'
          disabled={isLoading}
          className='mt-5 w-full bg-blue-800 hover:bg-blue-500 p-3 uppercase font-bold text-white text-lg'
          value={isLoading ? 'Guardando...' : 'Agendar cita'}
        />
      </form>
    </>
  );
};
