#! /usr/bin/env node
'use strict';

const inquirer = require('inquirer');

inquirer.prompt([
	{
		type: 'input',
		name: 'ext_name',
		message: 'Enter extension name:',
		default: ''
	},
	{
		type: 'input',
		name: 'desc',
		message: 'Enter extension description:',
		default: ''
	}
]).then(function(answers) {
	console.log(answers.testing);
});