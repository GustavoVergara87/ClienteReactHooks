
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";


{/*
//hay algo con el primer y segundo parametro de la funcion cuando se pasan de esta manera. Ademas
const  Tarjeta = (imagen,k,instrumento,marca,modelo,precio,costoEnvio,cantidadVendida) => {
*/
}

function Tarjeta({ id, imagen, instrumento, marca, modelo, precio, costoEnvio, cantidadVendida }) {

    const [state, setstate] = useState("full")
    const history = useHistory();

    async function handleDelete() {
        const response = await fetch(`https://localhost:44350/api/Instrumentos/${id}`, {
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

    function handleDetalle(){
        history.push(`/Detalle/${id}`)
    }

    if (state == "full") {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imagen} width="50" />
                <Card.Body>
                    <Card.Title>{instrumento}</Card.Title>
                    {marca} <br />
                    {modelo} <br />
                    {precio}  <br />
                    {costoEnvio} <br />
                    {cantidadVendida} <br />
                    <Button variant="primary" onClick={handleDetalle}>Detalle</Button>
                    <Button variant="secondary" onClick={handleEditar}>Editar</Button>
                    <Button variant="danger" onClick={handleDelete}>Borrar</Button>
                </Card.Body>
            </Card>
        )
    }
    return (
        <div></div>
    )
}

export default Tarjeta;
