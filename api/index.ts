import { serve } from "@hono/node-server"
import cjp from "cjp"
import genhera from "genhera"
import { Hono } from "hono"
import { minify } from "html-minifier-terser"
import { Translator } from "nomlish-translator-node"

import { index } from "../src"

import type { Context } from "hono"

interface RequestBody {
  input: string
}

interface NomlishRequestBody extends RequestBody {
  level?: 1 | 2 | 3 | 4
}

interface GoogleRetranslateRequestBody extends RequestBody {
  target?: string
  source?: string
}

const routePath = {
  root: "/",
  cjp: "/cjp",
  genhera: "/genhera",
  nomlish: "/nomlish",
  googleRetranslate: "/googleRetranslate",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const { GOOGLE_TRANSLATOR_API } = process.env

const makeOutput = (output: string) => ({
  output,
})

const setHeader = (c: Context) => {
  c.header("Access-Control-Allow-Origin", "*")
}

const minifiedIndex = minify(index, {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeTagWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
})

const app = new Hono()
app.get(routePath.root, async (c) => c.html(await minifiedIndex))

app.post(routePath.cjp, async (c) => {
  try {
    setHeader(c)
    const { input } = await c.req.json<RequestBody>()
    return c.json(makeOutput(cjp.generate(input)))
  } catch {
    c.status(500)
    return c.json({})
  }
})

app.post(routePath.genhera, async (c) => {
  try {
    setHeader(c)
    const { input } = await c.req.json<RequestBody>()
    return c.json(makeOutput(genhera.generate(input)))
  } catch {
    c.status(500)
    return c.json({})
  }
})

app.post(routePath.nomlish, async (c) => {
  try {
    const translator = new Translator()
    setHeader(c)
    const { input, level = 2 } = await c.req.json<NomlishRequestBody>()
    if (!Number.isInteger(level) || level > 4 || level < 1) {
      c.status(400)
      return c.json({})
    }
    return c.json(
      makeOutput(
        await translator.translate(input, {
          level,
        })
      )
    )
  } catch {
    c.status(500)
    return c.json({})
  }
})

app.post(routePath.googleRetranslate, async (c) => {
  try {
    setHeader(c)
    const { input, source = "ja", target = "zh" } = await c.req.json<GoogleRetranslateRequestBody>()
    const res = await fetch(GOOGLE_TRANSLATOR_API ?? "", {
      method: "POST",
      body: JSON.stringify({
        text: input,
        target,
        source,
      }),
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) throw new Error(res.statusText)

    const output = await res.text()
    if (!output) throw new Error("empty output")
    if (res.headers.get("Content-Type") === "text/html") throw new Error("unknown error")
    return c.json(makeOutput(output))
  } catch (e) {
    c.status(500)
    return c.json({})
  }
})

serve(app, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${info.port}`)
})
