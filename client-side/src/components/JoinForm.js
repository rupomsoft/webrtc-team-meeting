import React, {Component, Fragment} from 'react';
import FullScreenLoader from "./FullScreenLoader";
class JoinForm extends Component {
    render() {
        return (
            <Fragment>
                <div className="center text-center">
                    <h3 className="nav-item">Join Team</h3>
                    <input  placeholder="Your Name" type="text" className="form-control text-center form-rounded mt-3"/>
                    <button className="btn w-100 mt-3 btn-rounded btn-primary">Start</button>
                </div>
                <FullScreenLoader isLoading={""}/>
            </Fragment>
        );
    }
}
export default JoinForm;