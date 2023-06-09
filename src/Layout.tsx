export const Layout = (props: { children?: unknown }) => (
  <html lang="ja" style={{ colorScheme: "dark light" }}>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
      <link rel="preload" href="https://cdn.jsdelivr.net/npm/holiday.css@0.11.0" as="style" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/holiday.css@0.11.0"
        media="print"
        onload="this.media='all'"
      />
      <title>api.souhait.me</title>
    </head>

    <body>
      <header>
        <h1>api.souhait.me</h1>
        <p>自分用API置き場</p>
      </header>
      <main>{props.children}</main>
    </body>
  </html>
)
