import React, {Component, Fragment} from 'react';
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import {getName, logout, setPeerID} from "../helper/SessionHelper";
import {Redirect} from "react-router";
import Peer from 'peerjs'
import {AnnouceLeftJoiner, AnnouceNewJoiner, RequestFail} from "../helper/ToastHelper";
import io from 'socket.io-client';
import FullScreenLoader from "../components/FullScreenLoader";
import * as stream from "stream";
const socket=io.connect('/');

class MeetingPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            UserList:[],
            PeerObj:null,
            Redirect:false,
            selfPeerID:"",
            isLoading:"d-none",
            localVideo:true,
            localAudio:true,
        }
    }


    pageRedirect=()=>{
        if(this.state.Redirect===true){
            return(<Redirect to="/"/>)
        }
    }


    componentDidMount() {
        if(getName()===null){
            this.setState({Redirect:true})
        }
        else {
            this.createPeerID();
        }
    }


    createPeerID=()=>{
      this.setState({isLoading:""})
      let peer=new Peer();
      this.setState({PeerObj:peer});
        peer.on('open',(id)=>{
            if(id.length!==0){

                //Store PeerID
                setPeerID(id);
                this.setState({selfPeerID:id})


                // Create New User & Send Socket Server-Side
                let NewUser={Name:getName(),PeerID:id}
                socket.emit('CreateNewUser',NewUser);

                // Annouce New Joiner Received From Socket Server-Side
                socket.on('AnnouceNewJoiner',(Name)=>{
                    AnnouceNewJoiner(Name);
                })

                //Update Joiner List
                socket.on('UserList',(UserList)=>{
                    this.setState({UserList:UserList});
                })

                // Annouce Left
                socket.on('AnnouceLeftJoiner',(Name)=>{
                    AnnouceLeftJoiner(Name)
                })

                this.setState({isLoading:"d-none"});

                this.selfVidePreview();

            }
            else {
                RequestFail()
                logout();
                this.setState({Redirect:true})
                this.setState({isLoading:"d-none"})
            }
        })
    }



    // Local Stream
    selfVidePreview=()=>{
        let myVideo=document.createElement('video');
        myVideo.muted = true
        navigator.mediaDevices.getUserMedia({video:this.state.localVideo,audio:this.state.localAudio})
            .then((stream)=>{
                this.addVideoGrid(myVideo,stream)
            }).catch((err)=>{
        })
    }
    addVideoGrid=(video,stream)=>{
        const videoCanvas = document.getElementById('video-canvas');
        video.srcObject=stream;
        video.setAttribute("width", "280");
        video.setAttribute("height", "280");
        video.classList.add('video-preview');
        video.addEventListener('loadedmetadata', () => {
            video.play()
        });
        videoCanvas.append(video);
    }


    //Call Receive


    //Remote Stream


    render() {
        return (
            <Fragment>
                <TopNav/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div id="video-canvas">

                            </div>
                        </div>
                    </div>
                </div>
                <BottomNav UserList={this.state.UserList}/>
                <FullScreenLoader isLoading={this.state.isLoading}/>
                {this.pageRedirect()}
            </Fragment>
        );
    }
}
export default MeetingPage;