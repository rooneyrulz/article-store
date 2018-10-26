$(document).ready(() => {
    const btnsClose = $('.alert-close');
    btnsClose.on('click', (e) => {
        $(e.target).parent().fadeOut(1000);
    });
});