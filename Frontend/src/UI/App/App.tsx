import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ContextWrapper } from '../../Context/ContextWrapper';
import { Layout } from '../Components/HOCS/Layout';
import { Routes } from '../../Constant/Route/Routes';
import { initFlowbite } from 'flowbite';

function App() {
  useEffect(() => {
    initFlowbite();
    import('flowbite');
  }, []);
  return (
  <BrowserRouter>
    <Switch>
      <ContextWrapper>
        <Layout>
          {
            Routes.map((el, idx) => (
              <Route path={el.path} key={idx} exact>{<el.page/>}</Route>
            ))
          }
        </Layout>
      </ContextWrapper>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
