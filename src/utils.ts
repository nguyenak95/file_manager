const API_URL = import.meta.env.API_URL || "http://localhost:8080"

export const makeGetFolderContentUrl = (path: string) => {
  if (!path) {
    return `${API_URL}/fs?path=root`
  }
  return `${API_URL}/fs?path=${encodeURIComponent(path)}`
}

export async function handleFetchResponse<T>(
  fetchCall: Promise<Response>
): Promise<T> {
  let result = null
  try {
    const response = await fetchCall
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    result = response.json()
  } catch (error) {
    console.log(error)
  }
  return result
}

export const makeFetchCallWithCancel = (url: string, options?: RequestInit) => {
  const abortController = new AbortController()
  const fetchCall = fetch(url, { ...options, signal: abortController.signal })
  return { abortController, fetchCall }
}
