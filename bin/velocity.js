#!/usr/bin/env node

/*******************************************************************************

Author: Afrid Hussain
email: afridhussain dot d at gmail dot com

Velocity is a CLI tool to compile or interpret the C, C++, Python, JS file and 
show the result in the vim(default) window

*********************************************************************************/

import { watchFile } from 'fs';
import yargs from 'yargs';

// Implementing now for only one file, ignoring all the remaining files


watchFile(file, { interval: 1 }, (curr, prev) => {
  console.log("The file has been modified");
  console.log("Running the file");
  // console.log(`the current mtime is: ${curr.mtime}`);
  // console.log(`the previous mtime was: ${prev.mtime}`);
});
