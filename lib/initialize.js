'use strict';

/*global require module process*/

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

/**
 * process answer's & return config object based on app_type
 * @param {Object} answers answers received from inquirer
 * @param {String} app_type application type to create manifest file for
 * @return {Object} config processed cofiguration
 */
function process_answer(answers, app_type) {
	if (app_type === 'chrome_ext') {
		const process_crx_answer = require('../config/chrome/crx_process_answer');
		const default_config = require('../config/chrome/crx_config');

		const config = process_crx_answer(answers, default_config);
		return config;
	}
}

/**
 * create manifest file based on config obj
 * @param {Object} config config obj to create manifest file
 * @param {String} file_format manifest file type
 * @return {void}
 */
function write_file(config, file_format) {
	fs.writeFileSync(file_format, JSON.stringify(config, null, 4));
}

/**
 * ask question on prompt to generate manifest file
 * @param {Array} question set of question's prompt to the user
 * @param {String} app_type application type to create manifest file for
 * @param {String} file_format manifest file type
 * @return {void}
 */
function prompt_user(questions, app_type, file_format) {
	inquirer.prompt(questions).then(answers => {

		// generate config file based on answers
		const config = process_answer(answers, app_type);

		// get confirmation before writing file
		inquirer.prompt([
			{
				type: 'confirm',
				name: 'confirm',
				message: `Are you sure?, you wan't create ${file_format} in ${process.cwd()}:`,
				default: true
			}
		]).then(answer => {
			if (answer.confirm) {
				try {
					write_file(config, file_format);
					console.log(chalk.bgBlue(`\n${file_format} file created successfully..!`));
				} catch(e) {
					console.error(chalk.bgRed(e));
				}
			} else {
				console.warn(chalk.bgRed('\nAborted..!'));
			}
		});

	});
}

//---------------------------------------
// Public Interface
// --------------------------------------

module.exports = {
	prompt_user
};