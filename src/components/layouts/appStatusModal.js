import React, { Component } from 'react';
import { connect } from 'react-redux';
import DotsAnimation from '../animations/dotsAnimation';
import {PROCESSING_MUSIC} from '../music/music';

export class AppStatusModal extends Component {

    componentDidUpdate(prevProps){
        if (this.props.appStatus.isProcessing===true) {
            this.toggleDisplayModal('show');
            // this.toggleProcessingMusic('start');
        }

        if (this.props.appStatus.isProcessing===false) {
            this.toggleDisplayModal('hide');
            // this.toggleProcessingMusic('stop');
        }
    }

    toggleDisplayModal = (control) => {
        const modal = document.getElementById('app-status-modal');

        if (modal && modal.classList.contains('show') && control==='hide') {
            document.getElementById('app-status-modal-button').click();

        } else if (modal && !modal.classList.contains('show') && control==='show') {
            document.getElementById('app-status-modal-button').click();
        }
    }

    toggleProcessingMusic = (control) => {
        if (control === 'start') {
            document.getElementById('processing-music').volume = 0.1;
            document.getElementById('processing-music').play();
        } else {
            document.getElementById('processing-music').pause();
        }
    }

    render() {
        return (
            <div>
                {/* Modal */}
                <div className="modal fade" id="app-status-modal" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <button type="button" id="app-status-modal-button" className="d-none" data-toggle="modal" data-target="#app-status-modal"></button>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <p>Please wait while your transaction is being processed</p>
                                <DotsAnimation style={{marginTop:'40px'}} />
                                <audio name="processing music" id="processing-music" src={PROCESSING_MUSIC} loop={false} hidden={true} autostart="false"></audio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    appStatus:state.master.appStatus,
})

export default connect(mapStateToProps,null)(AppStatusModal);
