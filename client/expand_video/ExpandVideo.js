/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint jsx-a11y/mouse-events-have-key-events: 0 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import border from '../expand_shared_assets/expand_shared_border.png';
import closeButton from '../expand_shared_assets/expand_shared_close.png';
import closeButtonHovered from '../expand_shared_assets/expand_shared_close_over.png';
import videoTT from './assets/expand_video_tt.png';
import expandVid from './assets/expand.mp4';
import preloader from '../globalAssets/preloader.gif';
import './ExpandVideo.scss';

export default class ExpandVideo extends Component {
  constructor() {
    super();
    this.state = {
      statusCloseButton: closeButton,
      loading: null,
      click: true,
    };

    this.onHoverCloseButton = this.onHoverCloseButton.bind(this);
    this.onLeaveCloseButton = this.onLeaveCloseButton.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderVideo = this.renderVideo.bind(this);

    this.removeVideoButtons = this.removeVideoButtons.bind(this);
    this.renderVideoButtons = this.renderVideoButtons.bind(this);
  }

  onLeaveCloseButton() {
    this.setState({ statusCloseButton: closeButton });
  }

  onHoverCloseButton() {
    this.setState({ statusCloseButton: closeButtonHovered });
  }

  removeVideoButtons() {
    this.setState({ click: false });
  }

  renderSpinner() {
    this.setState({ loading: true });
  }

  renderVideo() {
    this.setState({ loading: false });
  }

  renderExpand() {
    if (this.state.loading) {
      return <source src={preloader} type="video/mp4" autoPlay />;
    }

    return <source src={expandVid} type="video/mp4" autoPlay />;
  }

  renderVideoButtons() {
    if (this.state.click) {
      if (this.state.loading) {
        return (
          <div className="expandVideo__video-container">
            <img
              src={preloader}
              alt="watch_video"
              className="expandVideo__video-tt"
            />;
            <img
              src={preloader}
              alt="close_video"
              className="expandVideo__close-button"
            />;
          </div>
        );
      }
      return (
        <div className="expandVideo__video-container">
          <img
            src={videoTT}
            alt="watch_video"
            className="expandVideo__video-tt"
          />
          <Link to="/collapse_resolve">
            <img
              src={this.state.statusCloseButton}
              alt="close_video"
              onMouseOver={this.onHoverCloseButton}
              onMouseLeave={this.onLeaveCloseButton}
              className="expandVideo__close-button"
            />
          </Link>
        </div>
      );
    }

    return <div />;
  }

  render() {
    const renderButtons = this.renderVideoButtons();
    const renderExpand = this.renderExpand();

    return (
      <div className="expand__video-container">
        <div
          className="expandVideo__border"
          style={{
            backgroundImage: `url(${border})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          {renderButtons}
          <video
            onLoadStart={this.renderSpinner}
            onPlay={this.renderVideo}
            onEnded={this.removeVideoButtons}
            className="expandVideo__player"
            autoPlay
            controls
          >
            {renderExpand}
          </video>
        </div>
      </div>
    );
  }
}
