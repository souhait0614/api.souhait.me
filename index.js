// @ts-check
import { serve } from "@hono/node-server";
import { Hono } from "hono";

/**
 * @param {import("hono").Context} c
 */
const setHeader = (c) => {
  c.header("Access-Control-Allow-Origin", "*")
}

const app = new Hono();
app.get("/", (c) => {
  setHeader(c)
  return c.text("Hello Hono!");
});

serve(app);
