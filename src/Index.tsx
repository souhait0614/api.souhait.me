import { readFileSync } from "fs"
import path from "path"

import hljs from "highlight.js"
import { raw } from "hono/html"
import { marked } from "marked"
import { markedHighlight } from "marked-highlight"

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  })
)

const mainMd = readFileSync(path.resolve(__dirname, "../src/Main.md"))
const mainHtml = marked
  .parse(mainMd.toString(), {
    mangle: false,
    headerIds: false,
    gfm: false,
  })
  .replace("\n", "")

export const Index = () => (
  <html lang="ja" style={{ colorScheme: "dark light" }}>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/holiday.css@0.11.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css"
      />
      <title>api.souhait.me</title>
    </head>

    <body>
      <header>
        <h1>api.souhait.me</h1>
        <p>自分用API置き場</p>
      </header>
      <main>{raw(mainHtml)}</main>
      <footer>
        <div>
          ©︎ 2023 <a href="https://souhait.me">すえ</a>
        </div>
        <div>
          <a href="https://github.com/souhait0614/api.souhait.me">Source</a>
        </div>
      </footer>
    </body>
  </html>
)
