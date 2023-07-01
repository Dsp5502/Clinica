import Swal from 'sweetalert2';

export const AlertDelete = (
  nameUser: string,
  typeToDelete: string,
  callback: () => void
) => {
  Swal.fire({
    title: `¿Estás seguro de eliminar el  ${typeToDelete} ${nameUser}?`,
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgb(37 99 235)',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminarlo!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};
