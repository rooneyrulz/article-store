$(document).ready(() => {
    //Sending post request
    $('#form-addArticle').on('submit', (e) => {
        e.preventDefault();

        const title = $('#title').val();
        const author = $('#author').val();
        const message = $('#message').val();
        const validateForm = $('#form-validate');
        const validateTitle = $('#title-validate');
        const validateAuthor = $('#author-validate');
        const validateMessage = $('#message-validate');

        if (title === "") {
            let validateText = `Title is not valid!`;
            validateTitle.html(validateText).fadeIn(1000);
        }
        if (author === "") {
            let validateText = `Author is not valid!`;
            validateAuthor.html(validateText).fadeIn(1000);
        }
        if (message === "") {
            let validateText = `Message is not valid!`;
            validateMessage.html(validateText).fadeIn(1000);
        }
        if (title !== "") {
            validateTitle.fadeOut(1000);
        }
        if (author !== "") {
            validateAuthor.fadeOut(1000);
        }
        if (message !== "") {
            validateMessage.fadeOut(1000);
        }
        if (title !== "" && author !== "" && message !== "") {
            $.ajax({
                type: 'POST',
                url: '/article/add',
                data: {
                    title: title,
                    author: author,
                    message: message
                },
                success: (article) => {
                    $('#title').val("");
                    $('#author').val("");
                    $('#message').val("");

                    let validateText = `Article successfully saved!`;
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
            window.location.href = '/article';
        }
    });

    //Sending post request for searching
    $('#form-search').on('submit', (e) => {
        e.preventDefault();
        //console.log(`Searching.....`);
        const author = $('#search-author').val();

        $.ajax({
            type: 'POST',
            url: '/article/search',
            data: {
                author: author
            },
            success: (article) => {
                //console.log(article);
                window.location.href = '/article/' + article._id;
            },
            error: (err) => {
                console.log(err);
            }
        });
    });


    //Sending post request for patching articles
    $('#patch-article').on('submit', (e) => {
        e.preventDefault();

        const title = $('#title-p').val();
        const author = $('#author-p').val();
        const message = $('#message-p').val();
        const showArticle = $('#show-article');
        const validateForm = $('#form-p-validate');
        const validateTitle = $('#title-p-validate');
        const validateAuthor = $('#author-p-validate');
        const validateMessage = $('#message-p-validate');

        if (title === "") {
            let validateText = `Title is not valid!`;
            validateTitle.html(validateText).fadeIn(1000);
        }
        if (author === "") {
            let validateText = `Author is not valid!`;
            validateAuthor.html(validateText).fadeIn(1000);
        }
        if (message === "") {
            let validateText = `Message is not valid!`;
            validateMessage.html(validateText).fadeIn(1000);
        }
        if (title !== "") {
            validateTitle.fadeOut(1000);
        }
        if (author !== "") {
            validateAuthor.fadeOut(1000);
        }
        if (message !== "") {
            validateMessage.fadeOut(1000);
        }
        if (title !== "" && author !== "" && message !== "") {
            let id = $(e.target).attr("articleId");

            $.ajax({
                type: 'PATCH',
                url: '/article/edit/' + id,
                data: {
                    title: title,
                    author: author,
                    message: message
                },
                success: (article) => {
                    $('#title-p').val("");
                    $('#author-p').val("");
                    $('#message-p').val("");

                    let validateText = `Article successfully updated!`;
                    validateForm.html(validateText).fadeIn(1000).fadeOut(5000);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });
});