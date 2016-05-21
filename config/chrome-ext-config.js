'use strict';

/**
 * export chrome extension manifest file format
 * @type {Object}
 */
const chromeExtConfig = {
	// required option's
	manifest_version: 2,
	name: '',
	version: '1.0.0',

	// recommended
	description: '',
	author: '',
	homepage_url: '',
	icons: {
		"128": ""
	},
	permissions: []
};

module.exports = chromeExtConfig;