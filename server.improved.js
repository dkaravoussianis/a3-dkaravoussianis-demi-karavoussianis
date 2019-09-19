console.log("Reading server.improved");

const port = 3000;
const multer = require('multer');
const crypto = require('crypto');
const morgan = require('morgan');
const express = require('express');
//const hbs = require('hbs');
const errorhandler = require('errorhandler')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.json());






const storage = multer.diskStorage({
  destination: function(req, file, cb) {
	  console.log("./public/images/");
    cb(null, "./public/images/" )      //you tell where to upload the files,
  },
    filename: function (req, file, callback) {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			if (err) return callback(err);
			callback(null, raw.toString('hex') + ".jpg"
			)
		});
	},
});
  

var upload = multer({storage: storage,
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
});


//setting up user db
db.defaults({ posts: [], user: {}, count: 0, balance: 100 })
  .write()


//passport stuff
ADMIN = 'username';
ADMIN_PASSWORD = 'password';

passport.use(new LocalStrategy((username, password, done) => {
	if (username === ADMIN && password === ADMIN_PASSWORD) {
		done(null, 'TOKEN'); 
		console.log("sucessful login");
		return;
	
//	db.get('users')
 // .find({ user: username, password: password })
 // .value()
	}
//	console.log("name doesnt match");
	done(null, false);
}));

// end of passport stuff


app.post('/avi', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log(req.file);
	 var filename = 'FILE NOT UPLOADED';
    return res.send({
      success: false
    });

  } else {
    console.log('Avi: file received');
	var filename = req.file;
	console.log(filename);
    res.send(file);
  }
  
});




app.post('/', function(request, response) {
    response.sendFile(__dirname + '/views/mainPage.html');
});


app.post('/submit', (req, res) => {

	db.get('posts')
	.push(req.body)
	.write()
	  
	// Increment count
	db.update('count', n => n + 1)
	  .write()
	  
	console.log(req.body.win);
	if (req.body.win == true)
	{
		db.update('balance', n => n + req.body.bet)
		  .write()
	}
	else
	{
		db.update('balance', n => n - req.body.bet)
		  .write()
	}
	console.log(db.get('balance').value())
	res.send(req.body);
  
  
  
})

app.post ('/allPosts', (req, res) => {
	json = {post: db.get('posts'), count: db.get('count'), balance: db.get('balance')};
	body = JSON.stringify(json);
	console.log(body);
	res.send(body);
	
});



app.post('/clearLog', (req, res) => {
//	const newState = {}
	db.set('posts', [])
  
  .write()
	
	db.set('count', 0)
  .write()
  
//	console.log(db.get('posts'));
	
	res.send(req.body);
  
})	;
	
	
app.post( '/login',  passport.authenticate('local', { session: false }), function (req, res){
	//res.send(JSON.stringify({
	//   token: req.username,
	console.log(req);
	loginData = req.body;
	db.set('user.username', loginData.Username)
	  .write();
	db.set('user.password', loginData.password)
	.write()

	res.end();
	});



// listen for requests :)
const listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
}); 



passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

