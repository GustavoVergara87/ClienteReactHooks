import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import '../assets/css/DetalleInstrumento.css';
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import Spinner from 'react-bootstrap/Spinner'

function DetalleInstrumento() {

    const { id } = useParams();

    const [instrumentoAMostrar, setInstrumentoAMostrar] = useState(null)



    useEffect(() => {
        async function fetchData() {
            setInstrumentoAMostrar(await getInstrumento(id))
        }
        fetchData()
        // eslint-disable-next-line
    }, [])

    async function getInstrumento(idInstrumento) {
        const response = await fetch(`/api/Instrumentos/${idInstrumento}`, {
            method: "GET",
        })
        if (!response.ok) {
            console.log('Error al obtener el instrumento')
        }
        const instrumento = await response.json()
        return instrumento;
    }


    if (!instrumentoAMostrar) {
        return (<div >
            <Spinner className="spinner" animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
        )
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col align="Center">
                        <img style={{ height: 210 }} src={`/api/Instrumentos/image/${instrumentoAMostrar.imagen}`} alt="" />
                        <br />
                        <p className="descripcion" >
                            Descripción:<br /><br />{instrumentoAMostrar.descripcion}
                        </p>
                    </Col>
                    <Col className="segundaColumna">
                        <p className="vendidos">{instrumentoAMostrar.cantidadVendida} vendidos</p>
                        <p className="titulo">{instrumentoAMostrar.instrumento}</p>
                        <p className="precio"> ${Intl.NumberFormat("de-DE").format(instrumentoAMostrar.precio)}</p>
                        <p> <span className="marcamodelo">Marca:</span> {instrumentoAMostrar.marca}</p>
                        <p> <span className="marcamodelo">Modelo:</span> {instrumentoAMostrar.modelo}</p>

                        {// eslint-disable-next-line
                            instrumentoAMostrar.costoEnvio == "G"
                                ? <span className="costoEnvioGratis">  <i className="fas fa-truck-moving"></i> Envío gratis a todo el país </span>
                                : <p className="costoEnvio"> {instrumentoAMostrar.costoEnvio} </p>
                        }
                        <div>
                            <Button className="botonCarrito" href="" variant="outline-success">Agregar al carrito</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}


export default DetalleInstrumento;