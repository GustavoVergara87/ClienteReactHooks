import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Formulario from './Formulario'
import '../assets/css/Contenedor.css'
const Alta = () => {

    const [formulario, setformulario] = useState({})

    async function sendText() {
        delete formulario.texto.id
        console.log(formulario.texto)
        const response = await fetch('https://localhost:44350/api/Instrumentos', {
            method: "POST",
            body: JSON.stringify(formulario.texto),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {         // if (response.status >= 200 && response.status < 300) {
            console.log('Error al enviar el instrumento')
        }
        const instrumentoNuevo = await response.json()
        sendImage(instrumentoNuevo.id);//El servidor response con el instrumento recien creado, de alli tomo el id para mandar la imagen
    }


    async function sendImage(idNuevo) {
        const formData = new FormData();

        if (formulario.imagen.pictureAsFile == null) { return }

        formData.append('image', formulario.imagen.pictureAsFile);

        const response = await fetch(`https://localhost:44350/api/Instrumentos/uploadimage/${idNuevo}`, {
            method: "POST",
            body: formData
            // headers: { 'Content-Type': 'multipart/form-data' }, //headers debe estar en blanco o si no da un error de missing boundaries
        })
        if (!response.ok) {
            console.log('Error al enviar la imagen')
            // for (var key of formData.entries()) {
            //     console.log(key[0] + ', ' + key[1])
            // }
        }
    }

    return (
        <div id="contenedor">
            <Formulario
                externalStateSetter={setformulario}
            ></Formulario>
            <div id="derecha">
                <Button type="button" onClick={sendText} >Crear</Button>
            </div >
        </div >
    )

}

export default Alta

