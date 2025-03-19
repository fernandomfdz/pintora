interface StreamMetadata {
  name: string
  unicode: string[]
  verticalAlign: number
}

export class BrowserReadableStream {
  private buffer: string[] = []
  private metadata?: StreamMetadata

  constructor() {
    this.buffer = []
  }

  push(chunk: string | null) {
    if (chunk !== null) {
      this.buffer.push(chunk)
    }
  }

  toString() {
    return this.buffer.join('')
  }

  setMetadata(metadata: StreamMetadata) {
    this.metadata = metadata
  }

  getMetadata() {
    return this.metadata
  }
} 