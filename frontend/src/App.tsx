import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

type UploadResult = { filename: string; size_bytes: number }

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking...')
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setApiStatus(d.status))
      .catch(() => setApiStatus('backend not reachable'))
  }, [])

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setResult(null)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    if (!res.ok) {
      setError((await res.json()).detail ?? 'Upload failed')
      return
    }
    setResult(await res.json())
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Invoice Checker</h1>
      <p>Backend status: {apiStatus}</p>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {result && (
        <p>
          Received {result.filename} ({result.size_bytes} bytes)
        </p>
      )}
    </main>
  )
}