import { useState } from "react";
import AadharUploadLandingPage from "./Component/FileUpload";
import ResultSection from "./Component/ResultSection";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {


  const [response, setResponse] = useState(null)

  return (
    <div className="App bg-gradient-to-br from-purple-100 to-purple-100">
      <ToastContainer />
      <AadharUploadLandingPage callback={(val) => setResponse(val)} />
      {response && <ResultSection response={response} />}
    </div >
  );
}

export default App;
