var mongoose = require('mongoose');

module.exports = mongoose.model('drawEFGH', {
    name: {
        type: String,
        default: ''
    },
	drawE: {
        type: { type: String, default: 'E' },
        active: { type: Boolean, default: true }
    },
	drawF: {
        type: { type: String, default: 'F' },
        active: { type: Boolean, default: true }
    },
	drawG: {
        type: { type: String, default: 'G' },
        active: { type: Boolean, default: true }
    },
	drawH: {
        type: { type: String, default: 'H' },
        active: { type: Boolean, default: true }
    },
	order: {
		type: Number,
        default: 99
	},
	done : Boolean
});