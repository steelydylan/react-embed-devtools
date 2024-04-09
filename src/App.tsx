import "./App.css";
import { Preview } from "./components/Preview";
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
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
`;

function App() {
	return (
		<>
			<Preview srcDoc={html} style={{ width: "100%", height: "100%" }} />
		</>
	);
}

export default App;
