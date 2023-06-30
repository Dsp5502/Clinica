import '../style/spinner.css';

interface Props {
  data: string;
}
export const Spinner = ({ data }: Props) => {
  return (
    <div className='min-h-full   '>
      <div className='spinner '></div>
      <p className='text-center font-bold text-2xl text-blue-600 '>
        {' '}
        Cargando {data}...
      </p>
    </div>
  );
};
