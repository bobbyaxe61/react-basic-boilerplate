import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import DotsAnimation from "../animations/dotsAnimation";
import { PROCESSING_MUSIC } from "../music/music";


const AppStatusModal = ({ applicationStatus }) => {
  const mounted = useRef();
  const audioPlayer = new Audio(PROCESSING_MUSIC);

  useEffect(() => {
    if (!mounted.current) {
      initializeAudioPlayer();
    } else {
      if (applicationStatus.isProcessing) {
        toggleDisplayModal("show");
        toggleProcessingMusic("start");
      }

      if (!applicationStatus.isProcessing) {
        toggleDisplayModal("hide");
        toggleProcessingMusic("stop");
      }
    }
  });

  const initializeAudioPlayer = () => {
    audioPlayer.volume = 0.3;
    audioPlayer.loop = true;
  };

  const toggleDisplayModal = (action) => {
    const modal = document.getElementById("app-status-modal");
    const modalOpenButton = document.getElementById("app-status-modal-open");
    const modalCloseButton = document.getElementById("app-status-modal-close");

    if (
      modal &&
      modalCloseButton &&
      modal.classList.contains("show") &&
      action === "hide"
    ) {
      modalCloseButton.click();
    } else if (
      modal &&
      modalOpenButton &&
      !modal.classList.contains("show") &&
      action === "show"
    ) {
      modalOpenButton.click();
    }
  };

  const toggleProcessingMusic = (control) => {
    if (control === "start") {
      audioPlayer.play().catch((err) => {
        console.log(err);
      });
    } else {
      audioPlayer.pause();
    }
  };

  return (
    <div>
      <button
        style={{ display: "none" }}
        id="app-status-modal-open"
        type="button"
        data-toggle="modal"
        data-target="#app-status-modal"
      >
        Launch
      </button>
      <div
        className="modal fade"
        id="app-status-modal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="appStatusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <button
                style={{ display: "none" }}
                id="app-status-modal-close"
                type="button"
                data-dismiss="modal"
              >
                Close
              </button>
              <p>Please wait while your request is being processed</p>
              <DotsAnimation style={{ marginTop: "40px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  applicationStatus: state.applicationStatus,
});

export default connect(mapStateToProps, null)(AppStatusModal);
