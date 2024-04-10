import "./App.css";
import React from "react";
import { EmbedDevTools } from "./components/EmbedDevTools";
import { embedChobitsu } from "./hooks/use-devtools";

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

export default App;
