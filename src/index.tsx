import * as React from 'react';
import { render } from 'react-dom';
import BestOfNView from './components/bonView';

const App = () => (
  <div>
    <BestOfNView />
  </div>
);

render(<App />, document.getElementById('root'));
