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
    axios.port("https://e9jttm6ap1.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData).then(() => {
      this.setState({ selectedFile: null, fileUploadedSuccessfully: true });
    })

  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>Last Modified: {new Date(this.state.selectedFile.lastModified).toDateString()}</p> {/* Correção aplicada aqui */}
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
          <h4>Choose a file and then press the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <h2>File Upload System</h2>
        <h3>File Upload with React and Serverless API</h3>
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
