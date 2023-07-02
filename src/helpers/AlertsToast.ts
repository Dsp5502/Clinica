import { SerializedError } from '@reduxjs/toolkit';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import Swal, { SweetAlertIcon } from 'sweetalert2';

import { isErrorWithMessage, isFetchBaseQueryError } from './typeErrorRtk';

export const alertToast = async (
  error: FetchBaseQueryError | SerializedError | string,
  icon: SweetAlertIcon
) => {
  let errMsg;
  if (isFetchBaseQueryError(error)) {
    errMsg =
      'error' in error
        ? error.error
        : 'data' in error && typeof error.data === 'object'
        ? (error.data as { message: string }).message
        : 'Unknown error';
  } else if (isErrorWithMessage(error)) {
    errMsg = error.message;
  } else {
    errMsg = error;
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: icon,
    title: errMsg,
  });
};
