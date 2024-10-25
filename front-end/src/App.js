import { useState } from "react";
import AadharUploadLandingPage from "./Component/FileUpload";
import ResultSection from "./Component/ResultSection";

function App() {


  const [response, setResponse] = useState(null)

  return (
    <div className="App bg-gradient-to-br from-purple-100 to-purple-100">
      {JSON.stringify(response)}
      <AadharUploadLandingPage callback={(val) => setResponse(val)} />
      {response && <ResultSection response={response} />}
    </div >
  );
}

export default App;
