// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Form, Button } from 'react-bootstrap';



// function MyNavbar() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">EpiWeather
           
//           </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           {/* Menù di sinistra */}
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
            
//           </Nav>

//           {/* Search form allineato a destra */}
//           <Form className="d-flex ms-auto">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-primary" type="submit">Submit</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default MyNavbar;


import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function MyNavbar({ onSearch }) {
  const [inputCity, setInputCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== "") {
      onSearch(inputCity.trim());
      setInputCity("");
    }
  };

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand href="#home" className="custom-navbar-text">EpiWeather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
<Nav.Link as={Link} to="/" onClick={() => onSearch("Rome")} className="custom-navbar-text">
  Home
</Nav.Link>          
  <Nav.Link href="#link" className="custom-navbar-text">Info</Nav.Link>
          </Nav>
          <Form className="d-flex ms-auto" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search city"
              className="me-2"
              aria-label="Search"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
