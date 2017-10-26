/* eslint jsx-a11y/media-has-caption: 0 */
/* eslint jsx-a11y/mouse-events-have-key-events: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import border from '../collapse_shared_assets/collapse_shared_border.png';
import button from '../collapse_shared_assets/collapse_shared_expand_over.jpg';
import hoveredButton from '../collapse_shared_assets/collapse_shared_expand.jpg';
import resolveBG from './assets/collapse_resolve_bg.png';
import resolveTT from './assets/collapse_resolve_tt.png';
import './CollapseResolve.scss';

export default class CollapseIntro extends Component {
  constructor() {
    super();
    this.state = {
      status: button,
    };

    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  onLeave() {
    this.setState({ status: button });
  }

  onHover() {
    this.setState({ status: hoveredButton });
  }

  render() {
    return (
      <div className="collapseResolve__intro-container">
        <div
          className="collapseResolve__border"
          style={{
            backgroundImage: `url(${border})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="imageResolve__container">
            <img
              src={resolveBG}
              alt="resolve_bg"
              className="imageResolve__bg"
            />
            <img
              src={resolveTT}
              alt="resolve_tt"
              className="imageResolve__tt"
            />
          </div>
          <Link to="/expand_video">
            <img
              src={this.state.status}
              alt="watch_video"
              onMouseOver={this.onHover}
              onMouseLeave={this.onLeave}
              className="collapseResolve__button"
            />
          </Link>
        </div>
      </div>
    );
  }
}
