# ReactEmbedDevTools

ReactEmbedDevTools is a library that allows you to inspect inside an iframe with the embedded DevTools

<div><video controls src="https://video.twimg.com/ext_tw_video/1775367594960355328/pu/vid/avc1/1152x720/CfFLP3w8uzGJIjaH.mp4?tag=12" muted="false"></video></div>

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
