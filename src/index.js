import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Main from './components/Main';
import Intro from './components/Intro';
import StoryDetails from './components/StoryDetails';

import './css/styles.css';

const Root = function() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Intro} />
        <Route exact path="/map" component={Main} />
        <Route path="/stories/:storyId" component={StoryDetails} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
