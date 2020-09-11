import React, { Component } from 'react';
import { connect } from 'react-redux';
import DotsAnimation from '../animations/dotsAnimation';
import {PROCESSING_MUSIC} from '../music/music';

export class AppStatusModal extends Component {

    componentDidMount(){
        this.initializeAudioPlayer();
    }

    componentDidUpdate(prevProps){
        if (prevProps.applicationStatus !== this.props.applicationStatus) {
            if (this.props.applicationStatus.isProcessing===true) {
                this.toggleDisplayModal('show');
                this.toggleProcessingMusic('start');
            }

            if (this.props.applicationStatus.isProcessing===false) {
                this.toggleDisplayModal('hide');
                this.toggleProcessingMusic('stop');
            }
        }
    }

    initializeAudioPlayer = () => {
        this.audioPlayer = new Audio(PROCESSING_MUSIC);
        this.audioPlayer.volume = 0.3;
        this.audioPlayer.loop = true;
    }

    toggleDisplayModal = (action) => {
        const modal = document.getElementById('app-status-modal');
        const modalOpenButton = document.getElementById('app-status-modal-open');
        const modalCloseButton = document.getElementById('app-status-modal-close');

        if (modal && modalCloseButton && modal.classList.contains('show') && action==='hide') {
            modalCloseButton.click();

        } else if (modal && modalOpenButton && !modal.classList.contains('show') && action==='show') {
            modalOpenButton.click();
        }
    }

    toggleProcessingMusic = (control) => {

        if (control === 'start') {
            this.audioPlayer.play().catch((err)=>{console.log(err);});
        } else {
            this.audioPlayer.pause();
        }
    }

    render() {
        return (
            <div>
                <button style={{display:'none'}} id="app-status-modal-open" type="button" data-toggle="modal" data-target="#app-status-modal">Launch</button>
                <div className="modal fade" id="app-status-modal" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="appStatusModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <button style={{display:'none'}} id="app-status-modal-close" type="button" data-dismiss="modal">Close</button>
                                <p>Please wait while your request is being processed</p>
                                <DotsAnimation style={{marginTop:'40px'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicationStatus:state.applicationStatus,
})

export default connect(mapStateToProps,null)(AppStatusModal);
