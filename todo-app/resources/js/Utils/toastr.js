// src/utils/toastr.js
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Configure Toastr
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

export const showSuccess = (message) => {
    toastr.success(message);
};

export const showError = (message) => {
    toastr.error(message);
};

export const showInfo = (message) => {
    toastr.info(message);
};

export const showWarning = (message) => {
    toastr.warning(message);
};
