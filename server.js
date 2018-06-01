const express = require('express');
const app = express();
const session = require('session');

const login = {
    login : 'admin',
    pwd : 'admin'
}

function basic_auth (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
        // fetch login and password
        if (new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString() == 'usernamehere123:passwordhere123') {
            next();
            return;
        }
    }
    console.log('Unable to authenticate user');
    console.log(req.headers.authorization);
    res.header('WWW-Authenticate', 'Basic realm="Admin Area"');
    if (req.headers.authorization) {
        setTimeout(function () {
            res.send('Authentication required', 401);
        }, 5000);
    } else {
        res.send('Authentication required', 401);
    }
}
app.use(basic_auth);

app.get('/',function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
