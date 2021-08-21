import React, {Component, Fragment} from 'react';
import loader from './../assets/images/loader.svg'
class FullScreenLoader extends Component {
    render() {
        return (
            <Fragment>
                <div className={this.props.isLoading+ " ProcessingDiv"}>
                    <div className="row p-0 m-0 d-flex justify-content-center">
                        <div className="col-md-12 m-0 p-0 center-screen">
                            <img className="loader-size" alt="loader" src={loader} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FullScreenLoader;