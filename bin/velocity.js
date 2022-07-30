#!/usr/bin/env node

/*******************************************************************************

Author: Afrid Hussain
email: afridhussain dot d at gmail dot com

Velocity is a CLI tool to compile or interpret the C, C++, Python, JS file and
show the result in the vim(default) window

*********************************************************************************/

import fs from 'fs' // NodeJS File System
import path from 'path' // NodeJS Path
import yargs from 'yargs' // yargs module to parse arguments
import { fileURLToPath } from 'url' // fileURLToPath converts path to system specific
import chalk from 'chalk' // for coloring of text
const __filename = fileURLToPath(import.meta.url) // path of velocity under the bin directory
const __dirname = path.dirname(__filename) // path of bin directory

// Implementing now for only one file, ignoring all the remaining files
const argv = yargs(process.argv.slice(2))
  .option('filename', {
    alias: 'f',

    description: 'File to watch over!'
  })
  .demandOption(['filename'], 'Please pass the file to watch over')
  .help().argv
const fileName = argv.filename // filename given by the user
const cwd = process.cwd() // current working directory
const filePath = path.resolve(cwd, fileName) // resolved path (Different path structures are managed by resolve method of path module)

// checking for the file existance
console.log('Checking for the file and read access...')
try {
  fs.accessSync(filePath, fs.constants.R_OK)
  console.log(chalk.greenBright('File found: ', filePath))
  console.log(chalk.greenBright(filePath, ': has read access...'))
} catch (err) {
  console.log(chalk.red('File:', './' + fileName, 'Not found'))
  console.log(chalk.red('Exiting the process...\n'))
  process.exitCode = 1
  process.exit()
}

console.log('Starting the file watchover:', './' + fileName)
