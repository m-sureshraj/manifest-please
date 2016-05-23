'use strict';

const config = require('./crx_config');

function process_crx_answer(answers) {
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

module.exports = process_crx_answer;