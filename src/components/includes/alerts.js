import React, { Component } from 'react';
import { connect } from 'react-redux';
import {isEmptyArray} from '../../helpers/helper';
import {setAlertAction, clearAlertAction} from '../../redux/actions/alertActions';

export class Alerts extends Component {
    state = {
        alerts:[],
    }

    componentDidUpdate(prevProps) {

        if (this.props.alerts !== prevProps.alerts && !isEmptyArray(this.props.alerts)) {

            // Update current list of alerts in component state
            this.setState({alerts:[...this.state.alerts,...this.props.alerts]});

            // Clear list of alerts in reducer
            this.props.clearAlertAction();

            // re-render component
            return true;
        }

        return false;
    }

    showAlert = (alerts)=>{
        if (!isEmptyArray(alerts)) {

            // Display current alert messages in state
            return alerts.map((item,key) => {
                return (
                    <div key={key} className={'alert alert-'+item.alertType+' alert-dismissible fade show'} role="alert">
                        <strong>Heads Up! </strong> {' '+item.alertMessage}
                        <button onClick={()=>{this.clearAlert(item.id)}} type="button" className="close border-0" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                );
            });
        }
    }

    clearAlert = (id) => {
        const unread = this.state.alerts.filter(alert => alert.id !== id);
        this.setState({alerts:unread});
    }

    render() {

        return (
            <div style={{position:'fixed', marginTop:70, zIndex:10, width:'40%', padding:'0px 60px', marginLeft:'60%'}}>
                {this.showAlert(this.state.alerts)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    alerts: state.alert.alerts,
});

export default connect(mapStateToProps, {setAlertAction, clearAlertAction})(Alerts);