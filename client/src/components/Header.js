import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        {/* <img src="./todo.jpg" style={{ maxWidth: 50 }} /> */}
          <Navbar.Brand href="/"><b>TODO</b></Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
