#!/usr/bin/env node

/*******************************************************************************

Author: Afrid Hussain
email: afridhussain dot d at gmail dot com

Velocity is a CLI tool to compile or interpret the C, C++, Python, JS file and 
show the result in the vim(default) window

*********************************************************************************/

import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);


// Implementing now for only one file, ignoring all the remaining files
const argv = yargs(process.argv.slice(2))
  .option("filename", {
    alias: "f",
    description: "File to watch over!"
  })
  .demandOption(["filename"], "Please pass the file to watch over")
  .help().argv;
const fileName = argv.filename;

// looking for the valid file !

const filePath = process.cwd();
fs.readFile(path.resolve(filePath, fileName), 'utf-8', (err, data) => {
  console.log(data);
});





