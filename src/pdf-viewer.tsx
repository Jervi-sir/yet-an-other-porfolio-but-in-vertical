// pdf-viewer.tsx (a small component you can reuse)
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function PdfViewer({ src }: { src: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let active = true
    let revoke: string | null = null

    ;(async () => {
      const res = await fetch(src, { cache: "no-store" })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      revoke = url
      if (active) setBlobUrl(url)
    })()

    return () => {
      active = false
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [src])

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-2">
        {blobUrl && (
          <Document
            file={blobUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(e) => console.error(e)}
          >
            <Page
              pageNumber={page}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className="!w-full !h-auto"
              width={820} // adjusts to your modal size
            />
          </Document>
        )}
      </div>

      {numPages && numPages > 1 && (
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Page {page} / {numPages}</span>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 rounded-md border border-neutral-700 hover:bg-neutral-800"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <button
              className="px-2 py-1 rounded-md border border-neutral-700 hover:bg-neutral-800"
              onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
