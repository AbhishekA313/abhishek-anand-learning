import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTERS } from './component/route/Common/routers';
import Page from './component/Page';

function App() {
  return (
    <Router>
      <Routes>
        {
          ROUTERS.map((route, idx) => {
            return <Route exact key={idx} path={route.path} element={<Page component={route.component} title={route.title} label={route.label} />} />
          })
        }
      </Routes>
    </Router>
  );
}

export default App;