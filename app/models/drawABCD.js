var mongoose = require('mongoose');

module.exports = mongoose.model('drawABCD', {
    name: {
        type: String,
        default: ''
    },
	drawA: {	
		type: { type: String, default: 'A' },
        active: { type: Boolean, default: true }
    },
	drawB: {
        type: { type: String, default: 'B' },
        active: { type: Boolean, default: true }
    },
	drawC: {
        type: { type: String, default: 'C' },
        active: { type: Boolean, default: true }
    },
	drawD: {
        type: { type: String, default: 'D' },
        active: { type: Boolean, default: true }
    },
	order: {
		type: Number,
        default: 99
	},
	done : Boolean
});