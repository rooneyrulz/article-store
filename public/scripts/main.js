$(document).ready(() => {
    //Sending post request
    $('#form-addArticle').on('submit', (e) => {
        e.preventDefault();

        const title = $('#title').val();
        const message = $('#message').val();
        const validateForm = $('#form-validate');
        const validateTitle = $('#title-validate');
        const validateMessage = $('#message-validate');

        if (title === "") {
            let validateText = `Title is not valid!`;
            validateTitle.html(validateText).fadeIn(1000);
        }
        if (message === "") {
            let validateText = `Article is not valid!`;
            validateMessage.html(validateText).fadeIn(1000);
        }
        if (title !== "") {
            validateTitle.fadeOut(1000);
        }
        if (message !== "") {
            validateMessage.fadeOut(1000);
        }
        if (title !== "" && message !== "") {
            $.ajax({
                type: 'POST',
                url: '/article/add',
                data: {
                    title: title,
                    message: message
                },
                success: (article) => {
                    $('#title').val("");
                    $('#message').val("");

                    let validateText = `Article successfully saved!`;
                    validateForm.addClass("alert alert-success mt-1");
                    validateForm.html(validateText).fadeIn(1000).fadeOut(7000);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });

    //Sending delete request
    $('.btn-delete').on('click', (e) => {
        //e.preventDefault();
        const id = $(e.target).attr("articleId");

        confirm = confirm(`Are you sure you want to delete the article..?`);
        if (confirm) {
            $.ajax({
                type: 'DELETE',
                url: '/article/' + id,
                success: (article) => {
                    console.log(article);
                    window.location.href = '/article';
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } else {
            window.location.href = '/article/' + id;
        }
    });

    
    //Sending post request for searching
    $('#form-search').on('submit', (e) => {
        e.preventDefault();
        //console.log(`Searching.....`);
        const title = $('#search-title').val();

        $.ajax({
            type: 'POST',
            url: '/article/search',
            data: {
                title: title
            },
            success: (article) => {
                console.log(article);
                window.location.href = '/article/' + article._id;
            },
            error: (err) => {
                alert(`Article not found!`);
                console.log(err);
            }
        });
    });
    


    //Sending post request for patching articles
    $('#patch-article').on('submit', (e) => {
        e.preventDefault();

        const title = $('#title-p').val();
        const message = $('#message-p').val();
        const showArticle = $('#show-article');
        const validateForm = $('#form-p-validate');
        const validateTitle = $('#title-p-validate');
        const validateMessage = $('#message-p-validate');

        if (title === "") {
            let validateText = `Title is not valid!`;
            validateTitle.html(validateText).fadeIn(1000);
        }
        if (message === "") {
            let validateText = `Article is not valid!`;
            validateMessage.html(validateText).fadeIn(1000);
        }
        if (title !== "") {
            validateTitle.fadeOut(1000);
        }
        if (message !== "") {
            validateMessage.fadeOut(1000);
        }
        if (title !== "" && message !== "") {
            let id = $(e.target).attr("articleId");

            $.ajax({
                type: 'PATCH',
                url: '/article/edit/' + id,
                data: {
                    title: title,
                    message: message
                },
                success: (article) => {
                    $('#title-p').val("");
                    $('#message-p').val("");

                    let validateText = `Article successfully updated!`;
                    validateForm.addClass('alert alert-success');
                    validateForm.html(validateText).fadeIn(1000).fadeOut(5000);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });


    //Sending post request to signup users
    $('#user-signup').on('submit', (e) => {
        console.log(e.target.id);
        e.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const password2 = $('#password2').val();
        const validateForm = $('#form-validate');
        const validateName = $('#name-validate');
        const validateEmail = $('#email-validate');
        const validateUsername = $('#username-validate');
        const validatePassword = $('#password-validate');
        const validatePassword2 = $('#password2-validate');

        if (name === "") {
            let validateText = `Name is not valid!`;
            validateName.html(validateText).fadeIn(1000);
        }
        if (email === "") {
            let validateText = `Email is not valid!`;
            validateEmail.html(validateText).fadeIn(1000);
        }
        if (username === "") {
            let validateText = `Username is not valid!`;
            validateUsername.html(validateText).fadeIn(1000);
        }
        if (password === "") {
            let validateText = `Password is not valid!`;
            validatePassword.html(validateText).fadeIn(1000);
        }
        if (password !== password2) {
            let validateText = `Password is not match!`;
            validatePassword2.html(validateText).fadeIn(1000);
        }
        if (name !== "") {
            validateName.fadeOut(1000);
        }
        if (email !== "") {
            validateEmail.fadeOut(1000);
        }
        if (username !== "") {
            validateUsername.fadeOut(1000);
        }
        if (password !== "") {
            validatePassword.fadeOut(1000);
        }
        if (password === password2) {
            validatePassword2.fadeOut(1000);
        }
        if (name !== "" && email !== "" && username !== "" && password !== "" && password === password2) {
            $.ajax({
                type: 'POST',
                url: '/user/signup',
                data: {
                    name: name,
                    email: email,
                    username: username,
                    password: password
                },
                success: (user) => {
                    $('#name').val("");
                    $('#email').val("");
                    $('#username').val("");
                    $('#password').val("");
                    $('#password2').val("");

                    let validateText = `User successfully saved!`;
                    validateForm.addClass('alert alert-success');
                    validateForm.html(validateText).fadeIn(1000).fadeOut(7000);
                },
                error: (err) => {
                    console.log(err);
                    let validateText = `Something went wrong try again later!`;
                    validateForm.removeClass('text-success');
                    validateForm.addClass('text-danger');
                    validateForm.html(validateText).fadeIn(1000).fadeOut(7000);
                }
            });
        }

    });
});