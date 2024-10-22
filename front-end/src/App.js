import AadharUploadLandingPage from "./Component/FileUpload";
import ResultSection from "./Component/ResultSection";

function App() {



  return (
    <div className="App bg-gradient-to-br from-purple-100 to-purple-100">
      <button onClick={() => {
        window.scroll({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }}>Click me</button>
      <AadharUploadLandingPage />
      <ResultSection />
    </div >
  );
}

export default App;
