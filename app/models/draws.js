var mongoose = require('mongoose');

module.exports = mongoose.model('draws', {
    name: {
        type: String,
        default: ''
    },
	hasDrawABCD: {
		type: Boolean, default: true
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
	hasDrawEFGH: {
		type: Boolean, default: true
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
	done : Boolean
});