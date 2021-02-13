const errorHandler = function () {
    return (err, req, res, next) => {
        let status = err.status || 500;
        let message = err.message || '';

        //    res.status(status).render('home', {errors: [{message}]})    }
        errors = message ? {errors: [{message}]} : '';
        res.status(status).render('404', errors)
    }
}

module.exports = errorHandler;