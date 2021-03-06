/**
 * Created by kgrube on 1/18/2016.
 */

/**
 * @private
 */
var Q = require('q'),
    inherits = require('util').inherits,
    ConnectWise = require('../ConnectWise.js');

/**
 * @typedef {object} ServiceNote
 * @property {number} id
 * @property {number} ticketId
 * @property {string} text the text of the particular note
 * @property {boolean} detailDescriptionFlag
 * @property {boolean} internalAnalysisFlag
 * @property {boolean} resolutionFlag
 * @property {MemberHref} member null if not applicable
 * @property {ContactHref} contact null if not applicable
 * @property {boolean} [customerUpdatedFlag]
 * @property {boolean} [processNotifications]
 * @property {string} dateCreated
 * @property {string} createdBy
 * @property {boolean} internalFlag
 * @property {boolean} externalFlag
 * @property {object} _info
 * @property {string} _info.lastUpdated
 * @property {string} _info.updatedBy
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
function ServiceNotes(options) {
    ConnectWise.apply(this, Array.prototype.slice.call(arguments));
}
inherits(ServiceNotes, ConnectWise);

/**
 * GET
 * @param ticketId
 * @param {Params} params
 * @returns {ServiceNote[]|promise}
 */
ServiceNotes.prototype.getServiceNotes = function (ticketId, params) {
    return this.api('/service/tickets/' + ticketId + '/notes', 'GET', params);
};

/**
 * POST
 * @param {string|number} ticketId
 * @param {ServiceNote} note
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.createServiceNote = function (ticketId, note) {
    return this.api('/service/tickets/' + ticketId + '/notes', 'POST', note);
};

/**
 * GET
 * @param ticketId
 * @param {ParamsConditions} params
 * @returns {Count|promise}
 */
ServiceNotes.prototype.getServiceNotesCount = function (ticketId, params) {
    return this.api('/service/tickets/' + ticketId + '/notes/count', 'GET', params);
};

/**
 *
 * @param ticketId
 * @param noteId
 * @returns {DeleteResponse|promise}
 */
ServiceNotes.prototype.deleteServiceNoteById = function (ticketId, noteId) {
    return this.api('/service/tickets/' + ticketId + '/notes/' + noteId, 'DELETE');
};

/**
 *
 * @param ticketId
 * @param noteId
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.getServiceNoteById = function (ticketId, noteId) {
    return this.api('/service/tickets/' + ticketId + '/notes/' + noteId, 'GET', params);
};

/**
 *
 * @param ticketId
 * @param noteId
 * @param {ServiceNote} note
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.updateServiceNote = function (ticketId, noteId, note) {
    return this.api('/service/tickets/' + ticketId + '/notes/' + noteId, 'PATCH', note);
};

/**
 *
 * @param ticketId
 * @param noteId
 * @param {ServiceNote} note
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.replaceServiceNote = function (ticketId, noteId, note) {
    return this.api('/service/tickets/' + ticketId + '/notes/' + noteId, 'PUT', note);
};

/**
 *
 * @param {string|number} ticketId
 * @param {string} text
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.createServiceNoteInternal = function (ticketId, text) {
    return this.createServiceNote(ticketId, {
        text: text,
        internalAnalysisFlag: true
    });
};

/**
 *
 * @param {string|number} ticketId
 * @param {string} text
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.createServiceNoteDetail = function (ticketId, text) {
    return this.createServiceNote(ticketId, {
        text: text,
        detailDescriptionFlag: true
    });
};

/**
 *
 * @param {string|number} ticketId
 * @param {string} text
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.createServiceNoteResolution = function (ticketId, text) {
    return this.createServiceNote(ticketId, {
        text: text,
        resolutionFlag: true
    });
};

/**
 *
 * @param {string|number} ticketId
 * @param {string} text
 * @returns {ServiceNote|promise}
 */
ServiceNotes.prototype.createServiceNoteDetailAndResolution = function (ticketId, text) {
    return this.createServiceNote(ticketId, {
        text: text,
        detailDescriptionFlag: true,
        resolutionFlag: true
    });
};

/**
 *
 * @type {ServiceNotes}
 */
module.exports = ServiceNotes;