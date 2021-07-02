import React from "react";
import "../assets/css/Envio.css";

class Envio extends React.Component {
    render() {

        if (this.props.costo_envio === "G") {
            return (
            <p className="costo_gratis">
                <img style={{display:"inline"}}
                src={require('../assets/images/camion.png').default}
                alt="camion.png" />Envió gratis a todo el país</p>
            )
        } else {
            return (
                <p className="costo_envio">{`Costo de Envío Interior de Argentina: $${this.props.costo_envio}`}</p>
            )
        }
    }
}

export default Envio;