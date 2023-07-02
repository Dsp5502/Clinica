import { addHours, isToday } from 'date-fns';

export const minDate = new Date();
minDate.setHours(minDate.getHours() + 2);

export const miniTime = new Date();
miniTime.setHours(8, 0, 0);

export const maxiTime = new Date();
maxiTime.setHours(17, 0, 0);

export const handleColor = (time: Date) => {
  return time.getHours() > 12 ? 'text-success' : 'text-error';
};

export const filterTime = (appointment: number | Date, time: Date) => {
  if (isToday(appointment)) {
    const currentHour = new Date().getHours();

    const maxSelectableHour = addHours(new Date(), 2).getHours();
    return (
      time.getHours() >= currentHour && time.getHours() <= maxSelectableHour
    );
  }

  return time.getHours() >= 8 && time.getHours() <= 17;
};
