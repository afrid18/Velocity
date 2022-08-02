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
import commandExists from 'command-exists'
import { exec } from 'child_process'
import { detectFileType, extPrograms, command } from './../index.js'
const __filename = fileURLToPath(import.meta.url) // path of velocity under the bin directory
const __dirname = path.dirname(__filename) // path of bin directory

// Implementing now for only one file, ignoring all the remaining files
const argv = yargs(process.argv.slice(2))
  .option('filename', {
    alias: 'f',

    description: 'File to watch over!'
  })
  .option('input', {
    alias: 'i',
    description: 'input for program'
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

console.log('Detecting the file type...')
const fileType = detectFileType(filePath).toString().trim()
console.log('filetype:', fileType)

// Checking for supported file types
if (extPrograms[fileType] === undefined) {
  console.log(chalk.red('File type not supported!'))
  process.exitCode = 1
  process.exit()
}

// checking for existance of filetype executable.
console.log(chalk.green('looking for', extPrograms[fileType]))
if (commandExists.sync(extPrograms[fileType])) {
  console.log(chalk.cyan('Found ' + extPrograms[fileType]))
}

// Checking for the input file
const defaultInputFile = argv.input !== undefined
if (defaultInputFile) {
  console.log('Looking for input file:', argv.input)
  if (fs.existsSync(path.resolve(process.cwd(), argv.input))) console.log('File exists!')
  else {
    console.log(chalk.red('Input file', argv.input, "doesn't exists!"))
    process.exit(1)
  }
} else {
  console.log(chalk.yellow('No input file provided'))
}

// Defining a commandLineInstruction
const commandLineInstruction = command(extPrograms[fileType], fileName, argv.input)
console.log(commandLineInstruction)

// watching file asynchronously
fs.watchFile(filePath, { interval: 25, bigint: true }, (curr, prev) => {
  console.clear()
  console.log(chalk.blue('Detected file changes'))
  console.log(chalk.greenBright('=>', commandLineInstruction))
  exec(commandLineInstruction, (error, stdout, stderr) => {
    if (error) {
      console.log(chalk.red('Error occured!'))
      console.log(error.message)
      return
    }
    if (stderr) {
      console.log(chalk.yellow('stderr!'))
      console.log(stderr)
      return
    }
    console.log(chalk.cyan('stdout:'))
    console.log(stdout)
  })
})

// listen for q or Q key to exit from the program
const stdin = process.stdin
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')
console.log('Press q or Q to exit')
stdin.on('data', function (key) {
  if (key === '\u0071' /* q */ || key === '\u0051' /* Q */ || key === '\u0003' /* ctrl + c */) {
    process.exit()
  }
})
