import { Command } from 'commander';

const program = new Command();

program
  .requiredOption('--sourceFile <file>', 'path to input file')
  .option('--resultFile <file>', 'path to output file')
  .option('--separator <char>', 'separator for output file')

program.parse(process.argv);


export default program.opts();