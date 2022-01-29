import React, {Component, Fragment} from 'react';
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import {getName, logout, setPeerID} from "../helper/SessionHelper";
import {Redirect} from "react-router";
import Peer from 'peerjs'
import {AnnouceLeftJoiner, AnnouceNewJoiner, RequestFail} from "../helper/ToastHelper";
import io from 'socket.io-client';
import FullScreenLoader from "../components/FullScreenLoader";
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
            ConnectedPeerList:[],
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
            this.GenerateSelfVideoPreview();
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

                this.GetJoinerList();

            }
            else {
                RequestFail()
                logout();
                this.setState({Redirect:true})
                this.setState({isLoading:"d-none"})
            }
        })
    }


    GetJoinerList=()=>{
        socket.on('UserList',(AppUserList)=>{
            this.setState({UserList:AppUserList});
            AppUserList.map((list,i)=>{
                this.CreateMutualConnection(list['PeerID'])
                this.ReceiveMutualVideoCall();
                this.CreateMutualVideoCall(list['PeerID'])
            })
        });
    }

    GenerateSelfVideoPreview=()=>{
        const myVideo = document.createElement('video')
        myVideo.muted = true
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            this.addVideoStream(myVideo, stream)
        })
    }

    addVideoStream=(video, stream)=> {
        const videoGrid = document.getElementById('video-grid')
        video.srcObject = stream
        video.setAttribute("width", "280");
        video.setAttribute("height", "280");
        video.classList.add('video-preview')
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        videoGrid.append(video)
    }



    CreateMutualConnection=(OtherPeerID)=>{
        let MyConnectedPeerList=this.state.ConnectedPeerList;
        if(!MyConnectedPeerList.includes(OtherPeerID)){
            let myPeer=this.state.PeerObj;
            let conn=myPeer.connect(OtherPeerID);
            conn.on('open',()=>{
                let MyConnectedPeerList=this.state.ConnectedPeerList;
                MyConnectedPeerList.push(OtherPeerID);
                this.setState({ConnectedPeerList:MyConnectedPeerList})
                conn.send(getName());
            })
            myPeer.on('connection',(conn)=>{
                conn.on('data',(data)=>{
                    console.log(data)
                })
            })
        }
    }


    CreateMutualVideoCall=(OtherPeerID)=>{
        let MyConnectedPeerList=this.state.ConnectedPeerList;
        if(!MyConnectedPeerList.includes(OtherPeerID)){
            let myPeer=this.state.PeerObj;
            navigator.mediaDevices.getUserMedia(this.state.Constraints)
                .then((stream)=>{
                    let call=myPeer.call(OtherPeerID,stream)
                    const video = document.createElement('video')
                    call.on('stream',(remoteStream)=>{
                        this.addVideoStream(video, remoteStream)
                    })
                })
                .catch(()=>{
                })
        }
    }

    ReceiveMutualVideoCall=()=>{
        let myPeer=this.state.PeerObj;
        myPeer.on('call',(call)=>{
            navigator.mediaDevices.getUserMedia(this.state.Constraints)
                .then((stream)=>{
                    call.answer(stream)
                    call.on('stream',(remoteStream)=>{
                    })
                })
                .catch(()=>{
                })
        })
    }


    render() {
        return (
            <Fragment>
                <TopNav/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div id="video-grid"></div>
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