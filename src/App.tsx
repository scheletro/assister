import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AssisterStateProvider } from './contexts/Assister';


import { Drag, Configuration } from './modules';

import './App.style.less';

const { Container } = Drag;

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AssisterStateProvider>
        <div className="App">
          <Container />
          <Configuration />
        </div>
      </AssisterStateProvider>
    </DndProvider>
  );
}

export default App;
