'use strict';

const custom_util = require('../../lib/util');

/**
 * set of question to generate manifest.json file
 * @type {Array}
 */
const questions = [{
		type: 'input',
		name: 'ext_name',
		message: 'Enter extension name:',
		default: custom_util.cwd(),
		filter: custom_util.filter(),
		validate: custom_util.validate()
	},
	{
		type: 'input',
		name: 'desc',
		message: 'Enter extension description:',
		filter: custom_util.filter(),
		validate: custom_util.validate()
	},
	{
		type: 'input',
		name: 'author',
		message: 'Enter author name:',
		filter: custom_util.filter(),
		validate: custom_util.validate()
	},
	{
		type: 'list',
		name: 'type',
		message: 'extension for?',
		default: 'none',
		choices: [
			{name: 'Browser action', value: 'browser_action'},
			{name: 'Page action', value: 'page_action'},
			{name: 'None', value: 'none'}
		]
	},
	{
		type: 'confirm',
		name: 'bg_page',
		message: 'Do extension need a background page?',
		default: false
	},
	{
		type: 'confirm',
		name: 'content_script',
		message: 'Do extension need to access DOM?',
		default: false
	},
	{
		type: 'confirm',
		name: 'option_page',
		message: 'Do extension need a option page?',
		default: false
	}
];

module.exports = questions;