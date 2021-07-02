import React from "react";
import Productos from "./components/Productos";
import { Switch, Route } from "react-router-dom";
import Alta from "./components/Alta";
import Modificacion from "./components/Modificacion";
import DetalleInstrumento from "./components/DetalleInstrumento";
import DondeEstamos from "./components/DondeEstamos";
import Home from "./components/Home";
import './assets/css/Generales.css';

class App extends React.Component{

  render(){

    return(

      <Switch>
        <Route exact path = "/" component={Productos}/>
        <Route exact path = "/Alta" component={Alta}/>
        <Route path = "/Modificacion/:id" component={Modificacion}/>
        <Route path = "/Detalle/:id" component={DetalleInstrumento}/>
        <Route path = "/DondeEstamos" component={DondeEstamos}/>
        <Route path = "/Home" component={Home}/>
      </Switch>
    )

  }

}

export default App;