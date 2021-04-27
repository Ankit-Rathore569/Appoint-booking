import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import './App.css';
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Home from "./component/Home/Home";
import Dashboard from "./component/admin/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { loadUser } from "./redux/Actions/userAction";
import store from "./store"

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  })
  return (
    <Router>
      < div className="App" >
        <Header />
        <div className="container container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute isAdmin={true} path="/admin/dashboard" component={Dashboard} exact />
          </Switch>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
