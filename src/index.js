#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import originalNcp from 'ncp';  // Renamed import
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename and __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Wrap ncp to return a promise manually
const ncp = (source, destination) => {
  return new Promise((resolve, reject) => {
    originalNcp(source, destination, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'run':
    execSync('npm start', { stdio: 'inherit' });
    break;
  case 'dev':
    execSync('npm run dev', { stdio: 'inherit' });
    break;
  case 'generate':
    // Prompt user for project name
    inquirer.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name:'
    }]).then(async (answers) => {
      const { projectName } = answers;
      const sourceDir = path.join(__dirname, '../template/exampleJS');  // Path to the exampleJS directory
      const targetDir = path.join(__dirname, projectName);  // Path to the new project directory

      try {
        // Check if the directory already exists
        if (fs.existsSync(targetDir)) {
          console.log('Directory already exists. Please choose a different name.');
          return;
        }

        // Create the target directory
        fs.mkdirSync(targetDir);

        // Manually copy files excluding node_modules
        const items = fs.readdirSync(sourceDir);
        for (const item of items) {
          const itemPath = path.join(sourceDir, item);
          const targetPath = path.join(targetDir, item);

          // Skip node_modules
          if (item === 'node_modules') continue;

          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            // Recursively copy directories
            fs.mkdirSync(targetPath);
            await ncp(itemPath, targetPath);
          } else {
            // Copy files
            fs.copyFileSync(itemPath, targetPath);
          }
        }

        console.log(`Project ${projectName} has been created successfully!`);
      } catch (error) {
        console.error('Error while generating project:', error);
      }
    });
    break;
  default:
    console.log('Usage: exp [run/dev/generate]');
}
