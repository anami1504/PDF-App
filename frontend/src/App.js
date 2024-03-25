
import { useEffect, useState } from "react";
import axios from 'axios'
import { pdfjs } from 'react-pdf';
import PdfComponent from "./component/PdfComponent";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [alldata, setAlldata] = useState(null);
  const [pdfFile, setPdfFile] = useState(null)

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/getdata");
    console.log(result.data.data);
    setAlldata(result.data.data);
  };

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file)
    const result = await axios.post(
      "http://localhost:5000/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(result)
    if (result.data.status === "ok") {
      alert("Uploaded Successfully")
      getPdf()
    }
  };


  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer")
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  }


  return (
    <div className='App'>
      <form className='formStyle' onSubmit={submitData}>
        <h4>UPLOAD YOUR PDF</h4>
        <br />
        <input
          type='text'
          className='form-control'
          placeholder='Title'
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type='file'
          className='form-control'
          accept='application/pdf'
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />

        <button className='btn btn-primary' type="submit">
          Submit
        </button>

      </form>

      <div className="uploaded">
        <h4 className="uploaded-text">Uploaded pdf</h4>
        <div className="output-div">
          {alldata == null ? "" : alldata.map((data) => {
            return (
              <div className="inner-div">
                <h6>Title:{data.title}</h6>
                <button className="btn btn-primary show-pdf" onClick={() => showPdf(data.pdf)}>Show Pdf</button>
              </div>
            )
          })}
        </div>
      </div>

      <PdfComponent pdfFile={pdfFile} />

    </div>
  );
}

export default App;
