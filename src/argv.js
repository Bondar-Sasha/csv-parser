const {Command} = require('commander')

const program = new Command()

program
  .option('--sourceFile <file>', 'path to input file')
  .option('--resultFile <file>', 'path to output file')
  .option('--separator <char>', 'separator for output file')
  .option('--generateFile <file>', 'to generate 14GB file')

const consoleArgs = program.parse(process.argv).opts()

if (!consoleArgs.generateFile && !consoleArgs.sourceFile) {
  console.error('Error: --sourceFile is required')
  process.exit(1)
}

module.exports = consoleArgs
