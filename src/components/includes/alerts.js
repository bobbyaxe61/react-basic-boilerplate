import React, { Component } from 'react';
import { connect } from 'react-redux';
import {isEmptyArray} from '../../helpers/helper';
import {setAlertAction, clearAlertAction} from '../../redux/actions/masterAlertActions';

export class Alerts extends Component {
    state = {
        alerts:[],
    }

    componentDidUpdate(nextProps, nextState) {

        if (this.props.alerts !== nextProps.alerts) {

            // Change current state
            this.setState({alerts:this.props.alerts});

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
                    <div key={key} className={'alert alert-'+item.alertType+' row justify-content-md-between'} role="alert">
                        <div> <strong> Heads Up! </strong> {' '+item.alertMessage}</div>
                        <button id={item.id} type="button" onClick={()=>{this.clearAlertAction(item.id)}} style={{backgroundColor:'transparent', border:'none'}}>X</button>
                    </div>
                );
            });
        }
    }

    clearAlertAction = (id) =>{
        const result = this.state.alerts.filter(alert => alert.id !== id);
        this.props.clearAlertAction(result);
    }

    render() {

        return (
            <div style={{position:'fixed', marginTop:70,zIndex:10, width:'40%', padding:'0px 60px', marginLeft:'60%'}}>
                {this.showAlert(this.state.alerts)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    alerts: state.master.alert.alerts,
});

export default connect(mapStateToProps, {setAlertAction, clearAlertAction})(Alerts);