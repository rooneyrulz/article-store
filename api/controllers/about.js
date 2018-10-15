//Render About
exports.RenderAbout = (req, res, next) => {
    res.status(200).render('about', { message: 'About Us' });
};