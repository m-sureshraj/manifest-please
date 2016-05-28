#! /usr/bin/env node
/*global require process*/

'use strict';

const manifest = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const init = require('../lib/initialize');

manifest
	.version('1.0.0')
	.option('init', 'initialize manifest')
	.parse(process.argv);

// print usage info if argument is empty
if (!process.argv.slice(2).length) {
	manifest.outputHelp();
	process.exit(0);
}

// banner
console.log(chalk.blue(`
: This tool walk you through to creating manifest file for your application
: Select the application type, you want create manifest file for
`));

// initialize
if (manifest.init) {
	// get the application type
	inquirer.prompt([
		{
			type: 'list',
			name: 'app_type',
			message: 'Select application type:',
			default: 'chrome_ext',
			choices: [
				{name: 'Chrome Extension', value: 'chrome_ext'}
			]
		}
	]).then(answer => {
		// create manifest file for choosed application
		const app_type = answer.app_type;

		if (app_type === 'chrome_ext') {
			const crx_questions = require('../config/chrome/crx_question');
			const file_format = 'manifest.json';
			init.prompt_user(crx_questions, app_type, file_format);
		}
	});
}