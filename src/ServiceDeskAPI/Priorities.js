/**
 * Created by kgrube on 12/24/2015.
 * @author kgrube
 * @TODO complete module
 */

/**
 * @private
 */
var inherits = require('util').inherits,
    ConnectWise = require('../ConnectWise.js');
/**
 * @typedef {object} Priority
 * @property {number} id
 * @property {string} name
 * @property {string} color
 * @property {number} sortOrder
 * @property {boolean} defaultFlag
 * @property {string} imageLink
 * @property {object} _info
 *
 */

/**
 *
 * @param {object} options
 * @param {string} options.companyId
 * @param {string} options.publicKey
 * @param {string} options.privateKey
 * @param {string} options.companyUrl
 * @constructor
 */
function Priorities(options) {
    ConnectWise.apply(this, Array.prototype.slice.call(arguments));
}
inherits(Priorities, ConnectWise);

/**
 *
 * @param {Params} params
 * @returns {promise|Priority[]}
 */
Priorities.prototype.getPriorities = function (params) {
    return this.api('/service/priorities', 'GET', params);
};

/**
 *
 * @type {Priorities}
 */
module.exports = Priorities;