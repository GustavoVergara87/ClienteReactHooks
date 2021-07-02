
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import '../assets/css/Tarjeta.css';

function Tarjeta({ id, imagen, instrumento, marca, modelo, precio, costoEnvio, cantidadVendida }) {

    const [state, setstate] = useState("full")
    const history = useHistory();

    async function handleDelete() {
        const response = await fetch(`/api/Instrumentos/${id}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            console.log('Error al borrar el instrumento');
            return
        }
        setstate("deleted");
    }

    function handleEditar() {
        history.push(`/Modificacion/${id}`)
    }

    function handleDetalle() {
        history.push(`/Detalle/${id}`)
    }

    // eslint-disable-next-line
    if (state == "full") {
        return (
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={imagen} width="50" />
                <Card.Body>
                    <Card.Title>{instrumento}</Card.Title>

                    <p> <span className="marcamodelo">Marca:</span> {marca}</p>
                    <p> <span className="marcamodelo">Modelo:</span> {modelo}</p>
                    <p className="precio"> ${Intl.NumberFormat("de-DE").format(precio)}</p>

                    {// eslint-disable-next-line
                        costoEnvio == "G"
                            ? <span className="costoEnvioGratis">  <i className="fas fa-truck-moving"></i> Envío gratis a todo el país </span>
                            : <p className="costoEnvio"> Costo de envío interior de Argentina: ${costoEnvio} </p>
                    }
                    <p className="vendidos">{cantidadVendida} vendidos</p>

                    <Button className="boton" variant="primary" onClick={handleDetalle}>Detalle</Button>
                    <Button className="boton" variant="secondary" onClick={handleEditar}>Editar</Button>
                    <Button className="boton" variant="danger" onClick={handleDelete}>Borrar</Button>
                </Card.Body>
            </Card>
        )
    }
    return (
        <div></div>
    )
}

export default Tarjeta;
