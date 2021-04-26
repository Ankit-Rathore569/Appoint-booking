import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import './App.css';
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";


function App() {
  return (
    <Router>
      < div className="App" >
        <Header />
        <div className="container container-fluid">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
