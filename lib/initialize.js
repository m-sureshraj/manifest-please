'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

/**
 * process answer's & return config object
 * @param {Object} answers answers received from inquirer
 * @param {Object} config basic config template for manifest
 * @return {Object} config
 */
function process_answer(answers, config) {
	// page_action & browser_action has identical default property
	const default_prop = {
		default_title: "",
		default_popup: ""
	};

	config.name = answers.ext_name;
	config.description = answers.desc;
	config.author = answers.author;

	// page_action || browser_action
	if (answers.type === 'page_action') {
		config.page_action = default_prop;
	} else if (answers.type === 'browser_action') {
		config.browser_action = default_prop;
	}

	// background_page
	if (answers.bg_page) {
		config.background = {
			scripts: [],
			persistent: false
		};
	}

	// content_script
	if (answers.content_script) {
		config.content_scripts = [{
			matches: [],
			css: [],
			js: []
		}];
	}

	// option page
	if (answers.option_page) {
		config.options_ui = {
			page: "",
			chrome_style: true
		};
	}

	return config;
}

/**
 * generate manifest file based on config obj
 * @param {Object} config config obj to generate manifest file
 * @return {void}
 */
function write_file(config) {
	fs.writeFileSync('manifest.json', JSON.stringify(config, null, 4));
}

/**
 * ask question on prompt to generate manifest file
 * @return {void}
 */
function prompt_user(question, default_config) {
	inquirer.prompt(question).then(answers => {
		// generate config file based on answers
		const config = process_answer(answers, default_config);

		// get confirmation before writing file
		inquirer.prompt([
			{
				type: 'confirm',
				name: 'confirm',
				message: `Are you sure?, you wan't create manifest.json in ${process.cwd()}:`,
				default: true
			}
		]).then(answer => {
			if (answer.confirm) {
				try {
					write_file(config);
					console.log(chalk.bgBlue('\nmanifest.json file created successfully..!'));
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