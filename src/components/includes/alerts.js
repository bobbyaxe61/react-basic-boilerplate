import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import {isEmptyArray} from '../../helpers/helper';
import {setAlertAction, clearAlertAction} from '../../redux/actions/alertActions';

const Alerts = (props) => {
    const [alerts, setAlert] = useState([]);
    const mounted = useRef();

    useEffect(() => {
        if(!mounted){
            if(props.alerts !== props.alerts && !isEmptyArray(props.alerts)) {
                setAlert([...alerts, ...props.alert]);

                props.clearAlertAction();
                return true;
            }
        }
    }, [props.alerts]);


   const  showAlert = (alerts)=>{
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
    };


 const clearAlert = (id) => {
        const unread = alerts.filter((alert) => alert.id !== id);
        setAlert(unread);
    };

    

        return (
            <div style={{position:'fixed', marginTop:70, zIndex:10, width:'40%', padding:'0px 60px', marginLeft:'60%'}}>
                {showAlert(alerts)}
            </div>
        )
    


}

    

    


const mapStateToProps = state => ({
    alerts: state.alert.alerts,
});

export default connect(mapStateToProps, {setAlertAction, clearAlertAction})(Alerts);