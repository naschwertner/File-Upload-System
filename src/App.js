import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  };

  onFileUpload = event => {
    this.setState({ selectedFile: event.target.files[0] }); // Correto para acessar o primeiro arquivo selecionado
  };

  onFileUploadButtonClick = () => {
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

  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>Detalhes do arquivo:</h2>
          <p>Nome do arquivo: {this.state.selectedFile.name}</p>
          <p>Tipo de arquivo: {this.state.selectedFile.type}</p>
          <p>Última modificação: {new Date(this.state.selectedFile.lastModified).toDateString()}</p> {/* Correção aplicada aqui */}
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br/>
          <h4>Your file has been successfully uploaded</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br/>
          <h4>Escolha um arquivo e pressione o botão Upload</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Sistema de upload de relatórios</h2>
        <h3>Upload de arquivos com React e API Serverless</h3>
        <div>
          <input type="file" onChange={this.onFileUpload} />
          <button onClick={this.onFileUploadButtonClick}>Upload</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
