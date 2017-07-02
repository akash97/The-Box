var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    },
	targetDate: {
        type: Date,
        default: Date.now
    },
	done : Boolean
});

/* module.exports = mongoose.model('Box', {
    name: {
        type: String,
        default: ''
    },
	drawA: {
        type: String,
        active: Boolean
    },
	drawB: {
        type: String,
        active: Boolean
    },
	drawC: {
        type: String,
        active: Boolean
    },
	drawD: {
        type: String,
        active: Boolean
    }
}); */