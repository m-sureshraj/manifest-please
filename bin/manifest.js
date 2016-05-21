#! /usr/bin/env node
'use strict';

const inquirer = require('inquirer');

inquirer.prompt([
	{
		type: 'input',
		name: 'testing',
		message: 'this is testing message?',
		default: 'defaut value'
	}
]).then(function(answers) {
	console.log(answers.testing);
})