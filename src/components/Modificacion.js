import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory, useParams } from 'react-router'
import Formulario from './Formulario'
import Spinner from 'react-bootstrap/Spinner'

const Modificacion = () => {

    const { id } = useParams();

    const [formulario, setformulario] = useState({})

    const [fomularioInicial, setformularioACargar] = useState(null)

    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            const instrumentoAEditar = await getInstrumento(id);
            setformularioACargar(instrumentoAEditar)
        }
        fetchData();
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

    async function enviarInstrumento() {
        await sendText();
        await sendImage(id);
        history.push("/")
    }

    async function sendText() {
        const response = await fetch(`/api/Instrumentos/${id}`, {
            method: "PUT",
            body: JSON.stringify(formulario.texto),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
            console.log('Error al enviar el instrumento')
        }
        return id; //El servidor response con el instrumento recien creado, de alli tomo el id para mandar la imagen
    }

    async function sendImage(idInstrumento) {
        const formData = new FormData();

        if (formulario.imagen.pictureAsFile == null) { return } //si no hay imagen para enviar, no enviar nada

        formData.append('image', formulario.imagen.pictureAsFile);

        const response = await fetch(`/api/Instrumentos/uploadimage/${idInstrumento}`, {
            method: "POST",
            body: formData
            // headers: { 'Content-Type': 'multipart/form-data' }, //headers debe estar en blanco o si no da un error de missing boundaries
        })
        if (!response.ok) {
            console.log('Error al enviar la imagen')
        }
    }

    if (!fomularioInicial) {
        return (
            <div>
                <Spinner className="spinner" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            )
    }

    return (
        <div className="contenedor">
            <Formulario
                externalStateSetter={setformulario}
                formularioACargar={fomularioInicial}
            ></Formulario>
            <div className="derecha">
                <Button type="button" onClick={enviarInstrumento}>Guardar</Button>
            </div>
        </div>
    )

}

export default Modificacion;

