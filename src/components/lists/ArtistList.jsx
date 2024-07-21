import React from 'react';
import { Card, Col, Button, Row, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';

const ArtistList = ({
  artists,
  handleEditArtistClick,
  handleDeleteArtistClick,
  editingArtist,
  editArtistForm,
  handleEditArtistChange,
  handleEditArtistSubmit,
  setShowArtistForm,
}) => {
  return (
    <div>
      <Button variant="primary" className="my-4" onClick={() => setShowArtistForm(true)}>
        CREATE ARTIST
      </Button>
      <Row>
        {artists.map((artist) => (
          <Col key={artist.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {artist.name}
                  <BsFillPencilFill className="ms-2" onClick={() => handleEditArtistClick(artist)} />
                  <BsFillTrash3Fill className="ms-2" onClick={() => handleDeleteArtistClick(artist.id)} />
                </Card.Title>
                <Card.Text>{artist.Bio}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{artist.Specialty}</Card.Subtitle>
                {editingArtist === artist.id && (
                  <Form onSubmit={handleEditArtistSubmit}>
                    <Form.Group controlId="formName">
                      <Form.Label>NAME</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={editArtistForm.name}
                        onChange={handleEditArtistChange} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formBio">
                      <Form.Label>BIOGRAPHY</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="BIO"
                        value={editArtistForm.Bio}
                        onChange={handleEditArtistChange} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formSpecialty">
                      <Form.Label>TOP SERVICES OF THIS ARTIST</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="Specialty"
                        value={editArtistForm.Specialty}
                        onChange={handleEditArtistChange} 
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      SAVE CHANGES
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ArtistList;