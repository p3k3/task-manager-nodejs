var Task = require('../models/task.js');

// GET - Return all tasks
exports.findAllTasks = function(req, res) {  
    Task.find(function(err, tasks) {
        if(err) {
            return res.status(500).send(err.message);
        }

        console.log('GET /tasks');
        res.status(200).jsonp(tasks);
    });
};

// GET - Return a task with specified ID
exports.findById = function(req, res) {  
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            return res.status(500).send(err.message);
        }

        console.log('GET /task/' + req.params.id);
        res.status(200).jsonp(task);
    });
};

// POST - Insert a new task
exports.addTask = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var task = new Task({
        description:    req.body.description,
        createDate:     Date.now(),
        state:          req.body.state
    });

    task.save(function(err, task) {
        if(err) {
            return res.status(500).send(err.message);
        }

        console.log('Created');
        res.status(200).jsonp(task);
    });
};

// PUT - Update a task already exists
exports.updateTask = function(req, res) {  
    Task.findById(req.params.id, function(err, task) {
        task.description  = req.body.description;
        task.createDate   = req.body.createDate;
        task.state        = req.body.state;

        task.save(function(err) {
            if(err) {
                return res.status(500).send(err.message);
            }

            console.log('PUT /task/' + req.params.id);
            console.log(req.body);
            res.status(200).jsonp(task);
        });
    });
};

// DELETE - Delete a task with specified ID
exports.deleteTask = function(req, res) {  
    Task.findById(req.params.id, function(err, task) {
        task.remove(function(err) {
            if(err) {
                return res.status(500).send(err.message);
            }
            
            console.log('DELETE /task/' + req.params.id);
            res.status(200).send();
        })
    });
};