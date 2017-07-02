var DrawABCD = require('./models/drawABCD');
var DrawEFGH = require('./models/drawEFGH');

function getDrawABCD(res) {
    DrawABCD.find(function (err, draws) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(draws); // return all todos in JSON format
    });
};

function getDrawEFGH(res) {
    DrawEFGH.find(function (err, draws) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(draws); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
	
	// get all drawABCD
    app.get('/api/drawABCD', function (req, res) {
        // use mongoose to get all drawABCD in the database
        getDrawABCD(res);
    });

    // create drawABCD and send back all todos after creation
    app.post('/api/drawABCD', function (req, res) {	
	
        // create a drawABCD, information comes from AJAX request from Angular
        DrawABCD.create({
            name: req.body.name,
			drawA: { type: req.body.drawA.type, active: req.body.drawA.active},
			drawB: { type: req.body.drawB.type, active: req.body.drawB.active},
			drawC: { type: req.body.drawC.type, active: req.body.drawC.active},
			drawD: { type: req.body.drawD.type, active: req.body.drawD.active},
			order: req.body.order,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the drawABCD after you create another
            getDrawABCD(res);
        });

    });

    // edit drawABCD and send back all todos after creation
    app.put('/api/drawABCD/:drawABCD_id', function (req, res) {

        // edit the drawABCD, information comes from AJAX request from Angular
        DrawABCD.update({
			_id: req.params.drawABCD_id
		}, {
            name: req.body.name,
			drawA: { type: req.body.drawA.type, active: req.body.drawA.active},
			drawB: { type: req.body.drawB.type, active: req.body.drawB.active},
			drawC: { type: req.body.drawC.type, active: req.body.drawC.active},
			drawD: { type: req.body.drawD.type, active: req.body.drawD.active},
			order: req.body.order,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the drawABCD after you create another
            getDrawABCD(res);
        });

    });

    // delete a drawABCD
    app.delete('/api/drawABCD/:drawABCD_id', function (req, res) {
        DrawABCD.remove({
            _id: req.params.drawABCD_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getDrawABCD(res);
        });
    });
	
	// drawABCD ends
	
	// get all drawEFGH
    app.get('/api/drawEFGH', function (req, res) {
        // use mongoose to get all drawEFGH in the database
        getDrawEFGH(res);
    });

    // create drawEFGH and send back all todos after creation
    app.post('/api/drawEFGH', function (req, res) {

        // create a drawEFGH, information comes from AJAX request from Angular
        DrawEFGH.create({
            name: req.body.name,
			drawE: { type: req.body.drawE.type, active: req.body.drawE.active},
			drawF: { type: req.body.drawF.type, active: req.body.drawF.active},
			drawG: { type: req.body.drawG.type, active: req.body.drawG.active},
			drawH: { type: req.body.drawH.type, active: req.body.drawH.active},
			order: req.body.order,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the drawEFGH after you create another
            getDrawEFGH(res);
        });

    });

    // edit drawEFGH and send back all todos after creation
    app.put('/api/drawEFGH/:drawEFGH_id', function (req, res) {

        // edit the drawEFGH, information comes from AJAX request from Angular
        DrawEFGH.update({
			_id: req.params.drawEFGH_id
		}, {
            name: req.body.name,
			drawE: { type: req.body.drawE.type, active: req.body.drawE.active},
			drawF: { type: req.body.drawF.type, active: req.body.drawF.active},
			drawG: { type: req.body.drawG.type, active: req.body.drawG.active},
			drawH: { type: req.body.drawH.type, active: req.body.drawH.active},
			order: req.body.order,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the drawEFGH after you create another
            getDrawEFGH(res);
        });

    });

    // delete a drawEFGH
    app.delete('/api/drawEFGH/:drawEFGH_id', function (req, res) {
        DrawEFGH.remove({
            _id: req.params.drawEFGH_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getDrawEFGH(res);
        });
    });
	
	// drawEFGH ends
	
	
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};