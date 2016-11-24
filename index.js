var express     = require("express");  
var bodyParser  = require("body-parser");
var mongoose    = require('mongoose');
var cors        = require('cors');

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set('port', 3000);

// Controllers
var TasksCtrl = require('./controllers/tasks');

// Router
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Node server");
});

// TVShow router
router.route('/tasks')  
  .get(TasksCtrl.findAllTasks)
  .post(TasksCtrl.addTask);

router.route('/task/:id')  
  .get(TasksCtrl.findById)
  .put(TasksCtrl.updateTask)
  .delete(TasksCtrl.deleteTask);

app.use(router);

mongoose.connect('mongodb://localhost/tasks', function(err, res) {  
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
    }
  
    app.listen(app.get('port'), function() {
        console.log('Node server running on http://localhost:' + app.get('port'));
    });
});