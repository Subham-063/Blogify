const {validateToken} = require('../services/auth') ;

function checkForAuthenticationCookie(cookieName) {
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName] ;
        if(!tokenCookieValue) return next() ;
        try {
            const userPayload = validateToken(tokenCookieValue) ;
            req.user = userPayload ;
        } catch (error) { 
            req.user = null ;
        } ;
       return next() ;
    }
}

function restrictToLoggedInUserOnly(req,res,next){

    if(!req.user){
        return res.redirect('/user/signin');
    }

    next();
}

module.exports = {
    checkForAuthenticationCookie,
    restrictToLoggedInUserOnly
}
