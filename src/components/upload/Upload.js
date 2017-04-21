import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class Upload extends Component {
  onDrop(acceptedFiles, rejectedFiles) {
     var req = request.post('/upload');
     acceptedFiles.forEach((file)=> {
       req.attach(file.name, file);
     });
     req.end(function(err, res) {
       if (err) console.log(err);
     });
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    );
  }
};

export default Upload;
