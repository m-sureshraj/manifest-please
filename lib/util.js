'use strict';

/**
 * return the cwd name
 * @return {String} cwd name
 */
function get_current_working_dir() {
	let cwd = process.cwd();
	return (cwd === '/') ? 'root' : cwd.substring(cwd.lastIndexOf('/') + 1);
}

function filter() {
	return function(answer) {
		return (answer !== ' ') ? answer.trim() : answer;
	}
}

function validate() {
	return function(answer) {
		return (answer !== ' ') ? true : 'Space not a valid input!';
	}
}

//------------------------------------
// Public Interfac
// -----------------------------------
module.exports = {
	cwd: get_current_working_dir,
	filter,
	validate
};