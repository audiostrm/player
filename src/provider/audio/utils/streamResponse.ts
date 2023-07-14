interface StreamedData {
  value: Uint8Array;
  done: boolean;
}
export function streamResponse(
  response: Response,
  onStream?: (buffer: Uint8Array) => void
) {
  const reader = response.body!.getReader();

  return new ReadableStream({
    async start(controller) {
      let bufferPos = 0;
      const bufferSize = 1024 * 16; // Adjust the buffer size as per your requirements
      const buffer = new Uint8Array(bufferSize);

      async function processChunk({ value, done }: StreamedData) {
        if (done) {
          controller.close();
          return;
        }

        let srcStart = 0;

        while (srcStart < value.byteLength) {
          const len = Math.min(
            bufferSize - bufferPos,
            value.byteLength - srcStart
          );

          // Copy chunk data to the buffer
          buffer.set(value.subarray(srcStart, srcStart + len), bufferPos);

          srcStart += len;
          bufferPos += len;

          if (bufferPos === bufferSize) {
            // Push each filled up chunk from the buffered array to readable stream
            onStream?.(buffer.slice(0, bufferPos));

            // Reset the position in the buffered array for next chunks
            bufferPos = 0;

            // Flush any pending already-enqueued chunks to downstream consumers
            controller.enqueue(buffer.slice(0, bufferPos));
          }
        }

        const result = await reader.read();
        processChunk(result as unknown as StreamedData); // Recursively read and process next chunk
      }

      const result = await reader.read();
      processChunk(result as unknown as StreamedData); // Start processing first chunk immediately after starting streaming
    },

    cancel() {
      reader.cancel(); // Cancel ongoing reading when cancellation is requested
    },
  });
}
