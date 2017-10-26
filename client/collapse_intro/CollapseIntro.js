/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint jsx-a11y/mouse-events-have-key-events: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import border from '../collapse_shared_assets/collapse_shared_border.png';
import button from '../collapse_shared_assets/collapse_shared_expand_over.jpg';
import hoveredButton from '../collapse_shared_assets/collapse_shared_expand.jpg';
import introVid from './assets/intro.mp4';
import clickAudio from './assets/collapse_intro_cfa.png';
import preloader from '../globalAssets/preloader.gif';
import './CollapseIntro.scss';

export default class CollapseIntro extends Component {
  constructor() {
    super();
    this.state = {
      status: button,
      loading: null,
      click: true,
    };

    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.removeClickAudio = this.removeClickAudio.bind(this);
    this.renderClickAudio = this.renderClickAudio.bind(this);
  }

  onLeave() {
    this.setState({ status: button });
  }

  onHover() {
    this.setState({ status: hoveredButton });
  }

  removeClickAudio() {
    this.setState({ click: false });
    this.props.history.push('/collapse_resolve');
  }

  renderSpinner() {
    this.setState({ loading: true });
  }

  renderVideo() {
    this.setState({ loading: false });
  }

  renderIntro() {
    if (this.state.loading) {
      return <source src={preloader} type="video/mp4" autoPlay />;
    }

    return <source src={introVid} type="video/mp4" autoPlay />;
  }

  renderClickAudio() {
    if (this.state.click) {
      if (this.state.loading) {
        return (
          <img
            src={preloader}
            alt="click_for_audio"
            className="video__click-audio"
          />
        );
      }
      if (!this.state.loading)
        return (
          <img
            src={clickAudio}
            alt="click_for_audio"
            className="video__click-audio"
          />
        );
    }

    return <div />;
  }

  render() {
    const renderText = this.renderClickAudio();
    const renderIntro = this.renderIntro();

    return (
      <div className="collapsed__intro-container">
        <div
          className="collapsed__border"
          style={{
            backgroundImage: `url(${border})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="video__container">
            <video
              className="video__player"
              onLoadStart={this.renderSpinner}
              onPlay={this.renderVideo}
              onEnded={this.removeClickAudio}
              autoPlay
            >
              {renderIntro}
            </video>
            {renderText}
          </div>
          <Link to="/expand_video">
            <img
              src={this.state.status}
              alt="watch_video"
              onMouseOver={this.onHover}
              onMouseLeave={this.onLeave}
              className="collapsed__button"
            />
          </Link>
        </div>
      </div>
    );
  }
}
