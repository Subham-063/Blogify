require('dotenv').config() ;

const express = require('express') ;
const path = require('path') ;
const userRoutes = require('./routes/user') ;
const blogRoutes = require('./routes/blog') ;
const mongoDB = require('mongoose') ;
const cookieParser = require('cookie-parser'); 
const {checkForAuthenticationCookie} = require('./middlewares/authentication') ;
const Blog = require('./models/blog')
const app = express() ;

const PORT = process.env.PORT || 8000 ;

mongoDB.connect(process.env.MONGO_URL).then((e) => {
console.log("MongoDB connected") ;
})
app.use(express.urlencoded({extended: false}) ) ;
app.use(express.static(path.resolve('./public')));
app.use(cookieParser()) ;
app.use(checkForAuthenticationCookie("token")) ;
app.set('view engine', 'ejs') ;
app.set('views', path.resolve('./views')) ;


app.get('/', async (req,res) => {

    const search = req.query.search || '';

    const allBlogs = await Blog.find({
        title: {
            $regex: search,
            $options: 'i'
        }
    }).populate('created_by').sort({ createdAt: -1 });

    res.render('home', {
        user: req.user,
        blogs: allBlogs,
        search
    });
});
app.use("/user", userRoutes) ;
app.use("/blog", blogRoutes) ;
app.listen(PORT, () => { console.log(`server started at PORT: ${PORT}`)}) ;