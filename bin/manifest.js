#! /usr/bin/env node
'use strict';

const crx_question = require('../lib/crx_question');
const crx_config = require('../config/crx_config');
const init = require('../lib/initialize');

init.prompt_user(crx_question, crx_config);