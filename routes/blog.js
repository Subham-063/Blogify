const {Router} = require('express') ;
const multer  = require('multer') ;
const path = require('path') ;
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const router = Router() ;

const {
    restrictToLoggedInUserOnly
} = require('../middlewares/authentication');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname 
    cb(null, filename)
  }
})
const upload = multer({ storage: storage }) ;


router.get('/add-new', restrictToLoggedInUserOnly, (req,res) => {
    return res.render('addBlog', {
        user: req.user
    })
}) ;

router.get(
    '/edit/:id',
    restrictToLoggedInUserOnly,
    async (req,res) => {

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.redirect('/');
        }

        if(blog.created_by.toString() !== req.user._id){
            return res.redirect('/');
        }

        return res.render('editBlog', {
            user: req.user,
            blog,
        });
    }
);
router.post(
    '/delete/:id',
    restrictToLoggedInUserOnly,
    async (req,res) => {

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.redirect('/');
        }

        if(blog.created_by.toString() !== req.user._id){
            return res.redirect('/');
        }

        await Blog.findByIdAndDelete(req.params.id);

        return res.redirect('/');
    }
);
router.get('/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id).populate('created_by') ;
    const comments = await Comment.find({ blog_id: blog._id }).populate('created_by').sort({ createdAt: -1 });
    return res.render('blog', {
      user: req.user ,
      blog,
      comments,
    }) ;
}) ;
router.post(
    '/edit/:id',
    restrictToLoggedInUserOnly,
    async (req,res) => {

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.redirect('/');
        }

        if(blog.created_by.toString() !== req.user._id){
            return res.redirect('/');
        }

        blog.title = req.body.title;
        blog.body = req.body.body;

        await blog.save();

        return res.redirect(`/blog/${blog._id}`);
    }
);
router.post('/comment/:blog_id',restrictToLoggedInUserOnly, async (req,res) => {
  const body = req.body ;
    await Comment.create( {
      content: req.body.content, 
      blog_id: req.params.blog_id, 
      created_by: req.user._id
    })
    return res.redirect(`/blog/${req.params.blog_id}`)
} )
router.post('/add-new', restrictToLoggedInUserOnly, upload.single("coverImage"), async (req,res) => {
    const {title, body} = req.body ;
    const blog = await Blog.create({
        title,
        body,
        created_by: req.user._id, 
        coverImageURL: `uploads/${req.file.filename}`
    }) ;
    return res.redirect(`/blog/${blog._id}`) ;
})



module.exports = router ;