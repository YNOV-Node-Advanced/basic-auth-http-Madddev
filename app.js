
function userMiddleware (req, res, next) {
    getUserViaJWT(req.headers.authentication)
        .then(function(user) {
            req.user = user
            next()
        })
        .catch(function (error) {
            res.status(401).end() //replace with proper error handling
        })
}
router.get('/profile',userMiddleware, function(req, res, next) {

    console.log();
});