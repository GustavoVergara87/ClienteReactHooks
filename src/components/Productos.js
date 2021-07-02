import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Tarjeta from "./Tarjeta";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner'

function Productos() {

    let [Instrumentos, setInstrumentos] = useState(null);

    useEffect(() => {
        fetch('/api/Instrumentos')
            .then(response => response.json())
            .then(data => setInstrumentos(data))
    }, []); // [] empty dependency array means this effect will only run once (like componentDidMount in classes)


    //si instrumentos es nulo (useEffect se ejecuta luego del render de la pagina) poner cargando o nada
    if (!Instrumentos) {
        return (
            <div>
                <Spinner className="spinner" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>)
    }

    const data = Instrumentos.map(ins => {
        return (
            <Col key={ins.id} className="mx-auto my-2">
                <Tarjeta key={ins.id}
                    id={ins.id}
                    imagen={`/api/Instrumentos/image/${ins.imagen}`}
                    instrumento={ins.instrumento}
                    marca={ins.marca}
                    modelo={ins.modelo}
                    precio={ins.precio}
                    costoEnvio={ins.costoEnvio}
                    cantidadVendida={ins.cantidadVendida}
                ></Tarjeta>
            </Col>
        )
    }
    )

    return (
        <div>
            <Container>
                <Row>
                    {data}
                </Row>
            </Container>
        </div>
    )

}

export default Productos;
