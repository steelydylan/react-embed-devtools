# ReactEmbedDevTools

ReactEmbedDevTools is a library that allows you to inspect inside an iframe with the embedded DevTools

<div><video controls src="https://github.com/steelydylan/react-embed-devtools/assets/2508691/9da803a2-973f-4514-994b-99094f9511f2" muted="false"></video></div>

This library is used for programing learning platform [https://mosya.dev](https://mosya.dev)

## Demo

[https://react-embed-devtools.vercel.app/](https://react-embed-devtools.vercel.app/)

## Installation

```bash
npm install react-embed-devtools
```

## Usage

You should embed the `embedChobitsu` function in the head tag of the html you want to inspect.

```jsx
import React from "react";
import { EmbedDevTools, embedChobitsu } from "react-embed-devtools";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  ${embedChobitsu()}
  <style>
    h1 {
      color: #333;
      font-size: 32px;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <script>console.log('Hello World')</script>
</body>
</html>
`;

function App() {
  return (
    <EmbedDevTools
      direction="vertical"
      srcDoc={html}
      style={{ width: "100%", height: "100%" }}
      resizableProps={{
        style: { background: "rgba(0, 0, 0, 0.1)", height: "10px" },
      }}
      devToolsProps={{
        style: { width: "100%", height: "100%" },
      }}
    />
  );
}
```
