import consoleArgs from './argv.mjs'
import readline from 'readline'
import fs from 'fs'
import path from 'path'

const inputFilePath = path.normalize(consoleArgs.sourceFile)
const outputFilePath = consoleArgs.resultFile
  ? path.normalize(consoleArgs.resultFile)
  : inputFilePath.replace('.csv', '.json')

const separator = consoleArgs.separator || ','

const writableStream = fs.createWriteStream(
  outputFilePath.endsWith('.json') ? outputFilePath : outputFilePath + '.json'
)

writableStream.write('[\n')

const stream = fs.createReadStream(inputFilePath)
let headers = null
let lineNum = 0
let firstEntry = true

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity,
})

rl.on('line', (line) => {
  lineNum++

  if (!line.trim()) return

  if (lineNum === 1) {
    headers = line.split(separator)
    return
  }

  const values = line.split(separator)
  const result = {}

  headers.forEach((header, index) => {
    result[header] = values[index]?.trim() || ''
  })

  const jsonEntry = JSON.stringify(result, null, 2)

  if (!firstEntry) writableStream.write(',\n')
  firstEntry = false

  writableStream.write(jsonEntry)
})

rl.on('close', () => {
  writableStream.write('\n]\n')
  writableStream.end()
})

rl.on('error', (err) => {
  console.error('Parsing error:', err)
  writableStream.destroy()
})

writableStream.on('error', (err) => {
  console.error('File writing error:', err)
})

writableStream.on('finish', () => {
  console.log('Done')
})
