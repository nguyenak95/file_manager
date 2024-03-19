import { HttpResponse, http } from "msw"
import { FolderResponse } from "../components/Folder"

// Mock Data
export const file = {
  id: "fileName",
  contents: "helloworld",
}
export const folder: FolderResponse = {
  id: "directory-1",
  entries: [
    {
      name: "directory-1a",
      type: "directory",
    },
    {
      name: "index.js",
      type: "file",
    },
  ],
}

export const handlers = [
  http.get("http://localhost:8080/fs", ({ request }) => {
    const url = new URL(request.url)

    const path = url.searchParams.get("path")
    if (path === "index.js") {
      return HttpResponse.json(file, { status: 200 })
    }
    if (path === "directory-1") {
      return HttpResponse.json(folder, { status: 200 })
    }
    if (path == "root") {
      return HttpResponse.json(folder, { status: 200 })
    }
    if (path === "directory-1/directory-1a/directory-1aA/index.js") {
      return HttpResponse.json(file, { status: 200 })
    }
    return HttpResponse.json({}, { status: 404 })
  }),
]
