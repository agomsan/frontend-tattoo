import React from "react";
import { Navbar, Container, Nav, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Artists.css";
import { getAllArtists } from "../../Calls/artistCall";

const Artists = () => {
  const artists = [
      {
          name: "Úrsula",
          bio: "International artist from México, she is a specialist in the placement of piercings and dilators",
      },
      {
          name: "Joseph",
          bio: "Joseph is an amazing artist in the placement of tattoo restoration",
      },
      {
          name: "Fran",
          bio: "Fran is a talented tattoo artist from Spain, his work has gained international recognition",
      },
      {
          name: "Lidya",
          bio: "One of the most talented tattoo artists in the world, her work has been recognized internationally, she is a specialist in fantasy tattoos",
      },
      {
          name: "Demian",
          bio: "Talented tattoo removal artist born in Spain",
      },
      {
          name: "Mariah",
          bio: "Known worldwide as Mariah, Olivia is her real name",
      },
  ];

  return (
    <div className="artist-body">
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            SURFING WORLD TATTOO STUDIO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link as={Link} to="/artists">
                Artists
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="artist-content">
        <h1>Artists</h1>
        <Container>
          <Row>
            {artists.map((artist, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card className="artist-card">
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                    <Card.Text>{artist.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Artists;
