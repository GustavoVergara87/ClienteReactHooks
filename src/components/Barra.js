import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Barra = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand >Musical Hendrix</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/DondeEstamos">Donde Estamos</Nav.Link>
                    <Nav.Link href="/">Productos</Nav.Link>
                    <Nav.Link href="/Alta">Ingresar producto</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Barra


