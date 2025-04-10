import React, { useState } from "react";
import { Storage, API } from "aws-amplify";
import awsconfig from "./aws-exports";
import "./App.css";

import Amplify from "aws-amplify";
Amplify.configure(awsconfig);

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const uploadFile = async () => {
    if (!file) return;
    const filename = file.name;
    await Storage.put(filename, file);
    const result = await API.post("ocrapi", "/ocr", {
      body: { key: filename },
    });
    setText(result.text);
  };

  return (
    <div className="App">
      <h1>📄 OCR 识别</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>上传并识别</button>
      <pre>{text}</pre>
    </div>
  );
}

export default App;
