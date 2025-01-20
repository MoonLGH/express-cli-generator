'use strict';

var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var originalNcp = require('ncp');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);
var originalNcp__default = /*#__PURE__*/_interopDefaultLegacy(originalNcp);

// Wrap ncp to return a promise manually
const ncp = (source, destination) => {
    return new Promise((resolve, reject) => {
        originalNcp__default["default"](source, destination, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
const args = process.argv.slice(2);
const command = args[0];
switch (command) {
    case 'run':
        child_process.execSync('npm start', { stdio: 'inherit' });
        break;
    case 'dev':
        child_process.execSync('npm run dev', { stdio: 'inherit' });
        break;
    case 'generate':
        // Prompt user for project name
        inquirer__default["default"].prompt().then(async (answers) => {
            const { projectName } = answers;
            const sourceDir = path__default["default"].join(__dirname, 'exampleJS'); // Path to the exampleJS directory
            const targetDir = path__default["default"].join(__dirname, projectName); // Path to the new project directory
            try {
                // Check if the directory already exists
                if (fs__default["default"].existsSync(targetDir)) {
                    console.log('Directory already exists. Please choose a different name.');
                    return;
                }
                // Create the target directory
                fs__default["default"].mkdirSync(targetDir);
                // Manually copy files excluding node_modules
                const items = fs__default["default"].readdirSync(sourceDir);
                for (const item of items) {
                    const itemPath = path__default["default"].join(sourceDir, item);
                    const targetPath = path__default["default"].join(targetDir, item);
                    // Skip node_modules
                    if (item === 'node_modules')
                        continue;
                    const stat = fs__default["default"].statSync(itemPath);
                    if (stat.isDirectory()) {
                        // Recursively copy directories
                        fs__default["default"].mkdirSync(targetPath);
                        await ncp(itemPath, targetPath);
                    }
                    else {
                        // Copy files
                        fs__default["default"].copyFileSync(itemPath, targetPath);
                    }
                }
                console.log(`Project ${projectName} has been created successfully!`);
            }
            catch (error) {
                console.error('Error while generating project:', error);
            }
        });
        break;
    default:
        console.log('Usage: exp [run/dev/generate]');
}
