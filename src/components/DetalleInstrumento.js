import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Envio from "./Envio";
import '../assets/css/DetalleInstrumento.css';
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";


function DetalleInstrumento() {

    const { id } = useParams();

    const [instrumentoAMostrar, setInstrumentoAMostrar] = useState(null)

    const history = useHistory()

    useEffect(async () => {
       setInstrumentoAMostrar(await getInstrumento(id))
    }, [])



    async function getInstrumento(idInstrumento) {
        const response = await fetch(`https://localhost:44350/api/Instrumentos/${idInstrumento}`, {
            method: "GET",
        })
        if (!response.ok) {
            console.log('Error al obtener el instrumento')
        }
        const instrumento = await response.json()
        return instrumento;
    }


    if (!instrumentoAMostrar) {
        return (<div></div>)
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col align="Center">
                        <img style={{ height: 210 }} src={`https://localhost:44350/api/Instrumentos/image/${instrumentoAMostrar.imagen}`} alt="" />
                        <br />
                        <p className="descripcion" >
                            Descripción:<br /><br />{instrumentoAMostrar.descripcion}
                        </p>
                    </Col>
                    <Col className="segundaColumna">
                        <p className="cantidad_vendidos">{instrumentoAMostrar.cantidadVendida} vendidos</p>
                        <p className="titulo">{instrumentoAMostrar.instrumento}</p>
                        <p className="precio"> ${Intl.NumberFormat("de-DE").format(instrumentoAMostrar.precio)}</p>
                        <p className="marcamodelo">Marca: {instrumentoAMostrar.marca}<br />
                        Modelo: {instrumentoAMostrar.modelo}</p>
                        <Envio costo_envio={instrumentoAMostrar.costoEnvio} />
                        <Button href="" variant="outline-success">Agregar al carrito</Button>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}


export default DetalleInstrumento;