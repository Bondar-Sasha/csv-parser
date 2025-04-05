const fs = require('fs')
const path = require('path')

const __dirname = process.cwd()

async function generateCSV(filePath) {
  const fullPath = path.join(__dirname, '..', path.normalize(filePath))
  const stream = fs.createWriteStream(fullPath, {
    highWaterMark: 20 * 1024 * 1024,
  })

  const line =
    Array.from({length: 125000}, (_, i) => `Column${i + 1}`).join(',') + '\n'

  for (let i = 0; i < 10000; i++) {
    const canWrite = stream.write(line)

    if (!canWrite) {
      await new Promise((resolve) => stream.once('drain', resolve))
    }
  }

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(stream))
    stream.on('error', reject)
    stream.end()
  })
}

module.exports = generateCSV
