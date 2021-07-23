import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import VerticalTabs from './Tab';
import ButtonAppBar from './ButtonAppBar';

function App() {
  
  return (
    <Fragment>
      <ButtonAppBar></ButtonAppBar>
      <VerticalTabs></VerticalTabs>
    </Fragment>
  );
}

export default App;

