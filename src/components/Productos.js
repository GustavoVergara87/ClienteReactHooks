import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Tarjeta from "./Tarjeta";
import Container from "react-bootstrap/Container";
import Barra from "./Barra";
function Productos() {

    let [Instrumentos, setInstrumentos] = useState(null);

    useEffect(() => {
        // fetch('https://localhost:44350/api/Instrumentos')
        //     .then(response => response.json())
        //     .then(data => setInstrumentos(data))



            
        async function getComida() {
            const response = await fetch(`https://localhost:44350/api/Articulos`)
            const instrumento = await response.json()
            console.log("tuerca")
            console.log(instrumento)
        }
        console.log("tuerca")
        getComida()
    }, []); // [] empty dependency array means this effect will only run once (like componentDidMount in classes)

    {/*
    Alternativamente
    useEffect(() => {
        obtenerDatos()
    }, []);

    const obtenerDatos = async () => {
        const url = "https://localhost:44350/api/Instrumentos/"
        const resp = await fetch(url)
        const data = await resp.json()
        setInstrumentos(data)
    }
    */
    }

    //si instrumentos es nulo (useEffect se ejecuta luego del render de la pagina) poner cargando o nada
    if (!Instrumentos) {
        return (<div>cargando</div>)
    }

    const data = Instrumentos.map(ins => {
        return (
            <Col key={ins.id}  className="mx-auto my-2">
                <Tarjeta key={ins.id}
                    id={ins.id}
                    imagen={`https://localhost:44350/api/Instrumentos/image/${ins.imagen}`}
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
