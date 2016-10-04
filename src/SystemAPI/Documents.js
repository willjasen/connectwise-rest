/*
 * Created by willjasen on 9/26/2016.
 * @author willjasen
 */

/**
 *
 * @private
 */
var Q = require('q'),
  inherits = require('util').inherits,
  ConnectWise = require('../ConnectWise.js');


/**
 * @typedef {object} Document
 * @property id
 * @property {string} title
 * @property {string} fileName
 * @property {string} serverFileName
 * @property {string} owner
 * @property {boolean} linkFlag
 * @property {boolean} imageFlag
 * @property {boolean} publicFlag
 * @property {boolean} readOnlyFlag
 * @property {object} _info
*/

/**
 *
 * @param {CWOptions} options
 * @constructor
 */
function Documents(options) {
  ConnectWise.apply(this, Array.prototype.slice.call(arguments));
}
inherits(Documents, ConnectWise);

/**
 * GET
 * @param {Params} params
 * @returns {Document[]|promise}
 */
Documents.prototype.getDocuments = function (params) {
  return this.api('/system/documents/', 'GET', params);
};

/**
 * GET
 * @param {string} id
 * @returns {Document|promise}
 */
Documents.prototype.getDocumentById = function (id) {
  return this.api('/system/documents/' + id, 'GET');
};

/**
 * GET
 * @param {string} id
 * @returns {object}
 */
Documents.prototype.downloadDocument = function (id) {
  return this.api_download('/system/documents/' + id + '/download', 'GET');
};

/**
 *
 * @type {Documents}
 */
module.exports = Documents;