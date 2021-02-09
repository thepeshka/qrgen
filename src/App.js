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
import AboutReadabilityPage from "./pages/aboutReadability";
import SaveQRFormStandalone from "./views/saveQrFormStandalone";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/data">
          <SaveQRFormStandalone />
        </Route>
        <MainLayout>
            <Route exact path="/">
              <QRForm formData={FormsData.text} />
            </Route>
            {Object.entries(FormsData).map(([key, form], i) =>
              <Route key={key} exact path={"/" + key}>
                <QRForm formData={form} />
              </Route>
            )}
            <Route exact path="/aboutReadability">
              <AboutReadabilityPage />
            </Route>
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default App;
