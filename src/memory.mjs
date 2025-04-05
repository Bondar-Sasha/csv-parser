export default function logMemoryUsage() {
  const memoryUsage = process.memoryUsage()
  console.log(`Memory for app: ${memoryUsage.rss / 1024 / 1024} MB`)
}
