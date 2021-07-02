import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory, useParams } from 'react-router'
import Formulario from './Formulario'


const Modificacion = () => {

    const { id } = useParams();

    const [formulario, setformulario] = useState({})

    const [fomularioInicial, setformularioACargar] = useState(null)
    
    const history = useHistory()

    useEffect(async () => {
        const instrumentoAEditar = await getInstrumento(id);
        setformularioACargar(instrumentoAEditar)
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

    async function enviarInstrumento(){
        await sendText();
        await sendImage(id);
        history.push("/")
    }

    async function sendText() {
        const response = await fetch(`https://localhost:44350/api/Instrumentos/${id}`, {
            method: "PUT",
            body: JSON.stringify(formulario.texto),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {         // if (response.status >= 200 && response.status < 300) {
            console.log('Error al enviar el instrumento')
        }
        return id; //El servidor response con el instrumento recien creado, de alli tomo el id para mandar la imagen
    }

    async function sendImage(idInstrumento ) {
        const formData = new FormData();
        
        if (formulario.imagen.pictureAsFile == null) { return } //si no hay imagen para enviar, no enviar nada
        
        formData.append('image', formulario.imagen.pictureAsFile);

        const response =  await fetch(`https://localhost:44350/api/Instrumentos/uploadimage/${idInstrumento }`, {
            method: "POST",
            body: formData
        })
        if (!response.ok) {
            console.log('Error al enviar la imagen')
        }
    }

    if (!fomularioInicial) {
        return (<div></div>)
    }

    return (
        <div>
            <Formulario
                externalStateSetter={setformulario}
                formularioACargar={fomularioInicial}
            ></Formulario>
            <Button type="button" onClick={enviarInstrumento}>Guardar</Button>
        </div>
    )

}

export default Modificacion;

