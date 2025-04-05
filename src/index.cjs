#!/usr/bin/env node

const path = require('node:path')
const fs = require('node:fs')
const {Transform} = require('node:stream')

const consoleArgs = require('./argv.cjs')
const logMemoryUsage = require('./memory.cjs')
const generateCSV = require('./generateFile.cjs')

const MEMORY = 20 * 1024 * 1024

const memoryLogInterval = setInterval(() => {
  logMemoryUsage()
}, 5000)

if (consoleArgs.generateFile) {
  generateCSV(consoleArgs.generateFile)
    .then((stream) => {
      console.log(`Done. Result saved to ${stream.path}`)
      process.exit(0)
    })
    .catch((err) => {
      console.error('Error generating:', err)
      process.exit(1)
    })
}
if (!consoleArgs.generateFile) {
  const separator = consoleArgs.separator || ','
  const inputFilePath = path.normalize(consoleArgs.sourceFile)
  const outputFilePath = consoleArgs.resultFile
    ? path.normalize(consoleArgs.resultFile)
    : inputFilePath.replace(/\.csv$/, '.json')

  const writableStream = fs.createWriteStream(
    outputFilePath.endsWith('.json')
      ? outputFilePath
      : `${outputFilePath}.json`,
    {autoClose: true, highWaterMark: MEMORY}
  )

  const transformStream = new Transform({
    highWaterMark: MEMORY,
    transform(chunk, encoding, callback) {
      const data = chunk.toString().replace(/\r/g, '')
      const lines = data.split('\n')

      if (!this.headers) {
        this.headers = lines[0].split(separator)
        this.push('[\n')
        lines.shift()
      }
      if (lines.length === 0) {
        callback()
      }

      if (this.isFirstChunk === undefined) {
        this.isFirstChunk = false
      } else {
        this.push(',\n')
      }

      const jsonEntries = lines.map((line) => {
        const values = line.split(separator)
        return this.headers.reduce((acc, header, idx) => {
          acc[header] = values[idx]
          return acc
        }, {})
      })

      const jsonString = jsonEntries
        .map((entry) => JSON.stringify(entry, null, 2))
        .join(',\n')

      this.push(jsonString)
      callback()
    },
    flush(callback) {
      this.push('\n]\n')
      callback()
    },
  })

  fs.createReadStream(inputFilePath, {
    autoClose: true,
    highWaterMark: MEMORY,
  })
    .pipe(transformStream)
    .pipe(writableStream)
    .on('error', (err) => {
      console.error(err)
    })
    .on('finish', () => {
      clearInterval(memoryLogInterval)
      console.log(`Done. Result saved to ${outputFilePath}`)
      process.exit()
    })
}
