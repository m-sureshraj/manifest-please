'use strict';

/*global module*/

/**
 * process chrome extension related answers & return config object
 * @param {Object} answers answers received from inquirer
 * @param {Object} config choosed application default manifest file format
 * @return {Object} config processed cofiguration
 */
function process_crx_answer(answers, config) {
	// page_action & browser_action has identical default property
	const default_prop = {
		default_title: '',
		default_popup: ''
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
			page: '',
			chrome_style: true
		};
	}

	return config;
}

module.exports = process_crx_answer;