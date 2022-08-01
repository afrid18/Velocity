import path from 'node:path'

export const detectFileType = fileName => {
  /* return the file extension */
  const fileType = path.extname(fileName)
  return fileType
}

export const extPrograms = {
  '.c': 'gcc',
  '.C': 'gcc',
  '.cpp': 'g++',
  '.CXX': 'g++',
  '.py': 'python3',
  '.js': 'node'
}


export const command = (program, executableFile, inputFile = "") => {
  const executableFileName = executableFile.split('.').slice(0, -1).join('.')
  const inputLiteral = inputFile === "" ? "" : ` < ${inputFile}`
  switch (program) {
    case 'gcc':
    case 'g++':
    case 'clang':
    case 'clang++':
      return `${program} ${executableFile} -o ${executableFileName} && ./${executableFileName} ${inputLiteral}`

    case 'python3':
    case 'python':
    case 'node':
      return `${program} ${executableFile} ${inputLiteral}`
  }
}

export default {
  detectFileType,
  extPrograms,
  command
}
