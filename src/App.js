import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully] =
    useState(false);

  const onFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUploadButtonClick = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    // Chamada de API aqui
    axios.post("https://e9jttm6ap1.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData).then(() => {
      this.setState({ selectedFile: null, fileUploadedSuccessfully: true });
    })

    axios
      .post(
        "https://e9jttm6ap1.execute-api.us-east-1.amazonaws.com/prod/file-upload",
        formData
      )
      .then(() => {
        setSelectedFile(null);
        setFileUploadedSuccessfully(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

 return (
    <div className="container">
      <div className="upload-container">
        <label htmlFor="contained-button-file">{selectedFile && selectedFile.name ? selectedFile.name : "Adicionar Relatório"}</label>
        <input
          id="contained-button-file"
          type="file"
          accept=".png, .jpeg, .pdf"
          onChange={onFileUpload}
        />
        <button className="upload-button" onClick={onFileUploadButtonClick} disabled={!selectedFile}>Upload</button>
      </div>
     
    
      {selectedFile ? (
        <div>
          <h2>Detalhes do Relatório</h2>
          <p>Nome: {selectedFile?.name}</p>
          <p>Tipo: {selectedFile?.type}</p>
          <p>
            Modificado em: {new Date(selectedFile?.lastModified).toLocaleDateString('pt-BR')}
          </p>
        </div>
      ) : null}
      {fileUploadedSuccessfully ? (
        <div>
          <h4>Your file has been successfully uploaded</h4>
        </div>
      ) : null}
      {!selectedFile ? (
        <div>
          <h4>Escolha um relatório e faça o upload</h4>
        </div>
      ) : null}
    </div>
  );
};

export default App;