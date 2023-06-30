import Swal, { SweetAlertIcon } from 'sweetalert2';

export const alertToast = async (error: string, icon: SweetAlertIcon) => {
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
    title: error,
  });
};
