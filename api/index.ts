import { readFile } from "fs/promises"
import path from "path"

import { serve } from "@hono/node-server"
import { Hono } from "hono"

const html = readFile(path.resolve(__dirname, "../src/index.html"))

const routePath = {
  root: "/",
  cjp: "/cjp",
  genhera: "/genhera",
  nomlish: "/nomlish",
  googleRetranslate: "/googleRetranslate",
}

// const setHeader = (c: Context) => {
//   c.header("Access-Control-Allow-Origin", "*")
// }

const app = new Hono()
app.get(routePath.root, async (c) => c.html((await html).toString()))

// app.post(routePath.cjp, (c) => {
//   try {
//     const input = c.req.json()
//   } catch (error) {

//   }
// })

serve(app, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${info.port}`)
})
