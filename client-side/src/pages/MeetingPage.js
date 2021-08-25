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


    constructor() {
        super();
        this.state={
            UserList:[],
            PeerObj:null,
            Redirect:false,
            selfPeerID:"",
            isLoading:"d-none"
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

                this.setState({isLoading:"d-none"})

            }
            else {
                RequestFail()
                logout();
                this.setState({Redirect:true})
                this.setState({isLoading:"d-none"})
            }
        })
    }

    render() {
        return (
            <Fragment>
                <TopNav/>
                <div className="container-fluid">
                    <div className="row">

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