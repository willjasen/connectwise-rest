/**
 * Created by kgrube on 7/14/2016.
 * @author kgrube
 */

/**
 * @typedef {object} SystemAPI
 * @property {Members} Members
 */

/**
 *
 * @param options
 * @returns {SystemAPI}
 * @constructor
 */
function SystemAPI(options) {
	var _Documents = require('./Documents');
    var _Members = require('./Members');

    return {
    	Documents: new _Documents(options)
        Members: new _Members(options)
    }
}

module.exports = SystemAPI;