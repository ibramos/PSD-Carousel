import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CollapseIntro from './collapse_intro/CollapseIntro';
import CollapseResolve from './collapse_resolve/CollapseResolve';
import ExpandVideo from './expand_video/ExpandVideo';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={CollapseIntro} />
      <Route path="/collapse_resolve" component={CollapseResolve} />
      <Route path="/expand_video" component={ExpandVideo} />
    </div>
  </BrowserRouter>
);

export default App;
