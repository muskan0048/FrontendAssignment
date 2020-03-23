import React, { Component } from "react";
import storage from "../Firebase/index";

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: "",
            progress: 0,
            uploadButton: false
        };
    }

    handleChange = e => {
        var _URL = window.URL || window.webkitURL;
        var that = this;
        if (e.target.files[0]) {
          const image = e.target.files[0];
          var img = new Image();
          
            var objectUrl = _URL.createObjectURL(image);
            img.onload = function () {
                //alert(this.width + " " + this.height);
                if(this.width===1024 && this.height===1024){
                    that.setState({uploadButton:true, image:image})
                }
                else{
                    alert("Image should be 1024 X 1024");
                    that.setState({uploadButton:false, image:null})
                }
                _URL.revokeObjectURL(objectUrl);
            }
            img.src = objectUrl;
          
         
        }
      };
    
    

    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ url });
                    });
            }
        );
    };


    render() {

        if (this.state.url) {
            return (
                <div>
                    <img className="imgFit"
                        src={this.state.url || "https://via.placeholder.com/755X450"}
                        alt="Uploaded Images"
                        height="450"
                        width="755"
                    />
                    <br />
                    <br />
                    <img className="imgFit"
                        src={this.state.url || "https://via.placeholder.com/365X450"}
                        alt="Uploaded Images"
                        height="450"
                        width="365"
                    />
                    <br />
                    <br />
                    <img className="imgFit"
                        src={this.state.url || "https://via.placeholder.com/365X212"}
                        alt="Uploaded Images"
                        height="212"
                        width="365"
                    />
                    <br />
                    <br />
                    <img className="imgFit"
                        src={this.state.url || "https://via.placeholder.com/380X380"}
                        alt="Uploaded Images"
                        height="380"
                        width="380"
                    />
                </div>)
        }

        return (
            <div className="center">
                <br />
                <h2 className="green-text">React Firebase Image Uploader</h2>
                <br />
                <br />
                <div className="row">
                    <progress value={this.state.progress} max="100" className="progress" />
                </div>
                <br />
                <br />
                <br />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleChange} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button
                    onClick={this.handleUpload}
                    className="waves-effect waves-light btn" disabled={!this.state.uploadButton}
                >
                    Upload
        </button>
                <br />
                <br />

            </div>
        );
    }
}

export default ImageUpload;