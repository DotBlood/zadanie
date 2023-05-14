function sAlert(title, text, icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })
    return Toast.fire({
        icon: icon,
        title: title,
        text: text
    })
}