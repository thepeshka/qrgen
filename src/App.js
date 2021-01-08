import './App.css';
import MainLayout from './views/mainLayout';
import QRForm from "./containers/qrForm";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FormsData from "./formsData";

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/">
            <QRForm formData={FormsData.text} />
          </Route>
          {Object.entries(FormsData).map(([key, form], i) =>
            <Route key={key} exact path={"/" + key}>
              <QRForm formData={form} />
            </Route>
          )}
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
