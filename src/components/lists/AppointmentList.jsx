import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const AppointmentList = ({
  appointments,
  services,
  artists,
  handleEditAppointmentClick,
  handleDeleteAppointmentClick,
  newAppointment,
  handleEditAppointmentChange,
  handleCreateAppointment,
}) => (
  <div>
    <h3>APPOINTMENT LIST</h3>
    {appointments.map((appointment) => (
      <Card key={appointment.id} className="mb-4">
        <Card.Body>
          <Card.Title>
            {new Date(appointment.appointment_date).toLocaleString()}
            <Button
              className="ms-2"
              onClick={() => handleEditAppointmentClick(appointment)}
            >
              <BsFillPencilFill />
            </Button>
            <Button
              className="ms-2"
              onClick={() => handleDeleteAppointmentClick(appointment.id)}
            >
              <BsFillTrash3Fill />
            </Button>
          </Card.Title>
          <Card.Text>USER ID {appointment.user.id}</Card.Text>
          <Card.Text>
            NAME {appointment.user.first_name} {appointment.user.last_name}
          </Card.Text>
          <Card.Text>
            SERVICE{" "}
            {appointment.service
              ? appointment.service.service_name
              : "NOT ASSIGNED"}
          </Card.Text>
          <Card.Text>
            ARTIST{" "}
            {appointment.artist ? appointment.artist.name : "NOT ASSIGNED"}
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
    <h3>CREATE NEW APPOINTMENT</h3>
    <Form onSubmit={handleCreateAppointment}>
      <Form.Group controlId="formAppointmentDate">
        <Form.Label>DATE AND TIME</Form.Label>
        <Form.Control
          type="datetime-local"
          name="appointment_date"
          value={newAppointment.appointment_date}
          onChange={handleEditAppointmentChange}
        />
      </Form.Group>
      <Form.Group controlId="formServiceId">
        <Form.Label>SERVICE</Form.Label>
        <Form.Control
          as="select"
          name="service_id"
          value={newAppointment.service_id}
          onChange={handleEditAppointmentChange}
        >
          <option value="">SELECT SERVICE</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.service_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formArtistId">
        <Form.Label>ARTIST</Form.Label>
        <Form.Control
          as="select"
          name="artist_id"
          value={newAppointment.artist_id}
          onChange={handleEditAppointmentChange}
        >
          <option value="">SELECT ARTIST</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        {newAppointment.id ? "UPDATE APPOINTMENT" : "CREATE APPOINTMENT"}
      </Button>
    </Form>
  </div>
);

export default AppointmentList;
