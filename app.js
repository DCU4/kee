var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    // cors = require('cors'),
    User = require("./models/user"),
    Kee = require("./models/kee"),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require("passport-local-mongoose"),
    passport = require('passport');


// mongoose.connect('mongodb://localhost:3000/kee',{ useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true });


app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(cors());


app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.use(require("express-session")({
    secret: "cadbury",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//reads session and encodes or decodes it
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//draw page route
app.get('/', isLoggedIn, function(req, res, next){
    res.render('index');
});


// saved routes
app.get('/saved', isLoggedIn, function(req, res, next){
    // get all kees from db by username that is currently logged in
    Kee.find({'user.username':req.user.username},function(err,allKees){
        if(err) {
            console.log(err);
        } else {
                res.render('saved',{kees: allKees });
                // console.log(allKees[42].user.username);
                // console.log(req.user.username);
        }
    });
    
});

app.post('/saved', isLoggedIn, function(req, res, next){
    //Create a new kee and save to DB
    // console.log(req.user);
    var user = {
        id: req.user._id,
        username: req.user.username
    }

    var newNote = {image:req.body.image,user:user }
    // console.log(newNote)
    Kee.create(newNote, function(err, newlyCreated){
        if(err) {
            //later this should be front end error message!!!!!!!!
            console.log(err);
        } else {
            res.redirect('/saved');
            // console.log(newlyCreated);
            // console.log(req.body._id);
        }
    });
});



// contact routes
app.get('/contact', isLoggedIn, function(req, res, next){
    res.render('contact');
});



// auth routes 

app.get("/register", function(req,res){
    res.render('register'); 
});

app.post('/register', function(req,res){
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.render('register');
        } else {
            passport.authenticate('local')(req,res,function(){
                res.redirect('/');
                // console.log(user);
            });
        }
    });
});

// Login routes
app.get('/login', function(req,res){
    res.render('login');
});

//login logic
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect:'/login'
}), function(req,res){
    
    
});


app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login');
}

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log('Server started');
// });

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started');
});




// var newUser = new User ({
//     email: "dylanjconnor4@gmail.com",
//     password: 'Dylan'
//     // kees: [{
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: "Kee"
//     // }]
// })

// var newKee = new Kee ({
//     image: 'data:image/png;base64,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',
//     description: 'test'
// });

// newKee.save(function(err, kee){
//     if(err){
//         console.log('uhoh');
//     } else {
//         console.log('saved');
//         console.log(kee);
//     }
// });

