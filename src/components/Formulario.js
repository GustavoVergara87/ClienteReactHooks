import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/esm/Col';
import "../assets/css/Formulario.css";


const Formulario = ({ externalStateSetter, formularioACargar }) => {

    const [formulario, setformulario] = useState({
        texto: {
            id: 0,
            instrumento: '',
            marca: '',
            modelo: '',
            imagen: '',
            precio: 0,
            costoEnvio: 0.0,
            cantidadVendida: 0,
            descripcion: ''
        },
        imagen: {
            picturePreview: null,
            pictureAsFile: null
        }
    }
    )

    useEffect(() => {
        externalStateSetter(formulario)
    }, [formulario])

    useEffect(() => {
        if (formularioACargar == null) { return }
        setformulario({
            texto: {
                id: formularioACargar.id,
                instrumento: formularioACargar.instrumento,
                marca: formularioACargar.marca,
                modelo: formularioACargar.modelo,
                imagen: formularioACargar.imagen,
                precio: formularioACargar.precio,
                costoEnvio: formularioACargar.costoEnvio,
                cantidadVendida: formularioACargar.cantidadVendida,
                descripcion: formularioACargar.descripcion
            },
            imagen: {
                picturePreview: `https://localhost:44350/api/Instrumentos/image/${formularioACargar.imagen}`,
                pictureAsFile: null
            }
        })
    }, [formularioACargar])

    const imageChangeHandler = ({ target }) => {
        setformulario({
            texto: { ...formulario.texto },
            imagen: {
                picturePreview: URL.createObjectURL(target.files[0]),
                pictureAsFile: target.files[0]
            }
        })
    }

    const textChangeHandler = ({ target }) => {
        setformulario({
            texto: { ...formulario.texto, [target.name]: (target.type=="number") ? target.valueAsNumber : target.value },
            imagen: { ...formulario.imagen }
        })

    }

    // {formularioACargar && const { instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion } = formulario.texto}

    return (

        <div id="FormGroup">
            <Form >
                <Form.Group as={Row}>
                    <Form.Label column md="2" >Instrumento</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="piano" onChange={textChangeHandler} name="instrumento" value={formulario.texto.instrumento} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column md="2">Marca</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="yamaha" onChange={textChangeHandler} name="marca" value={formulario.texto.marca} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column md="2">Modelo</Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="M20-HXC" onChange={textChangeHandler} name="modelo" value={formulario.texto.modelo} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column md="2">Imagen</Form.Label>
                    <Col md="auto">
                        <img src={formulario.imagen.picturePreview} height="150" alt="" />
                    </Col>
                    <Col >
                        <Form.File id="exampleFormControlFile1" onChange={imageChangeHandler} name="imagen" />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} >
                    <Form.Label column md="2">Precio</Form.Label>
                    <Col >
                        <Form.Control type="number" placeholder="0.0" onChange={textChangeHandler} name="precio" value={formulario.texto.precio} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column md="2">Costo envio</Form.Label>
                    <Col >
                        <Form.Control type="number" placeholder="0.0" onChange={textChangeHandler} name="costoEnvio" value={formulario.texto.costoEnvio} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column md="2">Cantidad vendida</Form.Label>
                    <Col >
                        <Form.Control type="number" placeholder="0" onChange={textChangeHandler} name="cantidadVendida" value={formulario.texto.cantidadVendida} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column md="2">Descripcion</Form.Label>
                    <Col >
                        <Form.Control as="textarea" rows={3} onChange={textChangeHandler} name="descripcion" value={formulario.texto.descripcion} />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Formulario;

