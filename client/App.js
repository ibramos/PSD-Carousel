import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CollapseIntro from './collapse_intro/CollapseIntro';
import CollapseResolve from './collapse_resolve/CollapseResolve';
import ExpandVideo from './expand_video/ExpandVideo';
import ExpandResolve from './expand_resolve/ExpandResolve';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={CollapseIntro} />
      <Route path="/collapse_resolve" component={CollapseResolve} />
      <Route path="/expand_video" component={ExpandVideo} />
      <Route path="/expand_resolve" component={ExpandResolve} />
    </div>
  </BrowserRouter>
);

export default App;
