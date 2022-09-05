module.exports = function (app) {

    const helmet = require('helmet');
    const cors = require('cors');
    const error = require('../middleware/error');
    const user = require('../routes/index');
    const verifyLogin = require('../middleware/verifylogin');
    const cookieParser = require('cookie-parser');


    app.use(cors());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    //// Sets "X-Frame-Options: DENY".
    app.use(helmet.frameguard({
        action: 'deny'
    }))

    //// hides the x-powerd-by
    app.use(helmet.hidePoweredBy())

    //cookie parser
    app.use(cookieParser());


    var index = require('../routes/index')
    app.use('/', user);

    app.use(error);

    app.get('*', function (req, res) {
        res.redirect('/');
        return;
    });


    return app;
}