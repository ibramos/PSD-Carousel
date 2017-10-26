/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint jsx-a11y/mouse-events-have-key-events: 0 */
/* eslint react/prop-types: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import border from '../expand_shared_assets/expand_shared_border.png';
import closeButton from '../expand_shared_assets/expand_shared_close.png';
import closeButtonHovered from '../expand_shared_assets/expand_shared_close_over.png';
import replayButton from './assets/expand_resolve_replay.png';
import learnButton from './assets/expand_resolve_cta.png';
import learnButtonHovered from './assets/expand_resolve_cta_over.png';
import resolveTT from './assets/expand_resolve_tt.png';
import leftButton from './assets/slideshow_left.png';
import leftButtonHovered from './assets/slideshow_left_over.png';
import rightButton from './assets/slideshow_right.png';
import rightButtonHovered from './assets/slideshow_right_over.png';
import slide1 from './assets/slideshow_1.jpg';
import slide2 from './assets/slideshow_2.jpg';
import slide3 from './assets/slideshow_3.jpg';
import './ExpandResolve.scss';

export default class ExpandResolve extends Component {
  constructor() {
    super();
    this.state = {
      statusCloseButton: closeButton,
      statusLeftButton: leftButton,
      statusRightButton: rightButton,
      statusLearnButton: learnButton,
      slideCounter: 1,
      statusSlide: slide1,
    };

    this.onHoverCloseButton = this.onHoverCloseButton.bind(this);
    this.onLeaveCloseButton = this.onLeaveCloseButton.bind(this);

    this.onHoverLearnButton = this.onHoverLearnButton.bind(this);
    this.onLeaveLearnButton = this.onLeaveLearnButton.bind(this);

    this.onHoverLeftButton = this.onHoverLeftButton.bind(this);
    this.onLeaveLeftButton = this.onLeaveLeftButton.bind(this);

    this.onHoverRightButton = this.onHoverRightButton.bind(this);
    this.onLeaveRightButton = this.onLeaveRightButton.bind(this);

    this.clickLeftButton = this.clickLeftButton.bind(this);
    this.clickRightButton = this.clickRightButton.bind(this);
  }

  onLeaveCloseButton() {
    this.setState({ statusCloseButton: closeButton });
  }

  onHoverCloseButton() {
    this.setState({ statusCloseButton: closeButtonHovered });
  }

  onLeaveLearnButton() {
    this.setState({ statusLearnButton: learnButton });
  }

  onHoverLearnButton() {
    this.setState({ statusLearnButton: learnButtonHovered });
  }

  onLeaveLeftButton() {
    this.setState({ statusLeftButton: leftButton });
  }

  onHoverLeftButton() {
    this.setState({ statusLeftButton: leftButtonHovered });
  }

  onLeaveRightButton() {
    this.setState({ statusRightButton: rightButton });
  }

  onHoverRightButton() {
    this.setState({ statusRightButton: rightButtonHovered });
  }

  clickLeftButton() {
    this.setState({
      slideCounter:
        this.state.slideCounter - 1 === 0 ? 3 : this.state.slideCounter - 1,
    });

    this.slideChecker();
  }

  clickRightButton() {
    this.setState({
      slideCounter:
        this.state.slideCounter + 1 === 4 ? 1 : this.state.slideCounter + 1,
    });

    this.slideChecker();
  }

  slideChecker() {
    if (this.state.slideCounter === 1) {
      this.setState({ statusSlide: slide1 });
    }
    if (this.state.slideCounter === 2) {
      this.setState({ statusSlide: slide2 });
    }
    if (this.state.slideCounter === 3) {
      this.setState({ statusSlide: slide3 });
    }
  }

  render() {
    return (
      <div className="expandR__container">
        <div
          className="expandR__border"
          style={{
            backgroundImage: `url(${border})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className="expandResolve__bg"
            style={{
              backgroundImage: `url(${this.state.statusSlide})`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Link to="/expand_video">
              <img
                src={replayButton}
                alt="replay_button"
                className="expandResolve__replay"
              />
            </Link>

            <Link to="/collapse_resolve">
              <img
                src={this.state.statusCloseButton}
                alt="close_video"
                onMouseOver={this.onHoverCloseButton}
                onMouseLeave={this.onLeaveCloseButton}
                className="expandResolve__close-button"
              />
            </Link>

            <img
              src={this.state.statusLeftButton}
              alt="left_button"
              onMouseOver={this.onHoverLeftButton}
              onMouseLeave={this.onLeaveLeftButton}
              onClick={this.clickLeftButton}
              className="expandResolve__left-button"
            />

            <img
              src={this.state.statusRightButton}
              alt="right_button"
              onMouseOver={this.onHoverRightButton}
              onMouseLeave={this.onLeaveRightButton}
              onClick={this.clickRightButton}
              className="expandResolve__right-button"
            />

            <img
              src={resolveTT}
              alt="resolve_tt"
              className="expandResolve__resolve-tt"
            />

            <a href="http://avatarlabs.com">
              <img
                src={this.state.statusLearnButton}
                alt="learn_button"
                onMouseOver={this.onHoverLearnButton}
                onMouseLeave={this.onLeaveLearnButton}
                className="expandResolve__learn-button"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
