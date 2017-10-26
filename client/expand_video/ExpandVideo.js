/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint jsx-a11y/mouse-events-have-key-events: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import border from '../expand_shared_assets/expand_shared_border.png';
import closeButton from '../expand_shared_assets/expand_shared_close.png';
import closeButtonHovered from '../expand_shared_assets/expand_shared_close_over.png';
import videoTT from './assets/expand_video_tt.png';
import expandVid from './assets/expand.mp4';
import preloader from '../globalAssets/preloader.gif';
import pause from './assets/video_pause.png';
import pauseOver from './assets/video_pause_over.png';
import play from './assets/video_play.png';
import playOver from './assets/video_play_over.png';
import './ExpandVideo.scss';

export default class ExpandVideo extends Component {
  constructor() {
    super();
    this.state = {
      statusCloseButton: closeButton,
      statusPlayPause: pause,
      loading: null,
      click: true,
    };

    this.onHoverCloseButton = this.onHoverCloseButton.bind(this);
    this.onLeaveCloseButton = this.onLeaveCloseButton.bind(this);

    this.onHoverPlayPauseButton = this.onHoverPlayPauseButton.bind(this);
    this.onLeavePlayPauseButton = this.onLeavePlayPauseButton.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderVideo = this.renderVideo.bind(this);

    this.removeVideoButtons = this.removeVideoButtons.bind(this);
    this.renderVideoButtons = this.renderVideoButtons.bind(this);

    this.togglePlayPause = this.togglePlayPause.bind(this);
  }

  componentDidMount() {
    const video = this.videoPlayer;
    video.controls = false;
  }

  onLeaveCloseButton() {
    this.setState({ statusCloseButton: closeButton });
  }

  onHoverCloseButton() {
    this.setState({ statusCloseButton: closeButtonHovered });
  }

  onLeavePlayPauseButton() {
    if (this.state.statusPlayPause === pauseOver) {
      this.setState({ statusPlayPause: pause });
    }

    if (this.state.statusPlayPause === playOver) {
      this.setState({ statusPlayPause: play });
    }
  }

  onHoverPlayPauseButton() {
    if (this.state.statusPlayPause === pause) {
      this.setState({ statusPlayPause: pauseOver });
    }

    if (this.state.statusPlayPause === play) {
      this.setState({ statusPlayPause: playOver });
    }
  }

  togglePlayPause() {
    const video = this.videoPlayer;
    if (video.paused || video.ended) {
      this.setState({ statusPlayPause: pause });
      video.play();
    } else {
      this.setState({ statusPlayPause: play });
      video.pause();
    }
  }

  removeVideoButtons() {
    this.setState({ click: false });
    this.props.history.push('/expand_resolve');
  }

  renderSpinner() {
    this.setState({ loading: true });
  }

  renderVideo() {
    this.setState({ loading: false });
  }

  renderExpandVideo() {
    if (this.state.loading) {
      return <source src={preloader} type="video/mp4" autoPlay />;
    }

    return <source src={expandVid} type="video/mp4" autoPlay />;
  }

  renderVideoButtons() {
    if (this.state.click) {
      if (this.state.loading) {
        return (
          <div>
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
        <div>
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
          <img
            src={this.state.statusPlayPause}
            alt="watch"
            className="expandVideo__play"
            ref={el => (this.playPause = el)}
            onMouseOver={this.onHoverPlayPauseButton}
            onMouseLeave={this.onLeavePlayPauseButton}
            onClick={this.togglePlayPause}
          />
        </div>
      );
    }

    return <div />;
  }

  render() {
    const renderButtons = this.renderVideoButtons();
    const renderExpand = this.renderExpandVideo();

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
            ref={el => (this.videoPlayer = el)}
          >
            {renderExpand}
          </video>
        </div>
      </div>
    );
  }
}
