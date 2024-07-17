import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../../Calls/userCall";
import {
  createArtist,
  getAllArtists,
  updateArtistById,
  deleteArtistById,
} from "../../Calls/artistCall";
import {
  getAllAppointments,
  getUserAppointments,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
} from "../../Calls/appointmentCall";
import { getAllServices } from "../../Calls/serviceCall";
import UserList from "../../components/lists/UserList";
import ArtistList from "../../components/lists/ArtistList";
import AppointmentList from "../../components/lists/AppointmentList";
import "./userProfile.css";
import { useAuth } from "../../contexts/authContext/AuthContext";

export default function UserProfile({ isAdmin }) {
  const [profileData, setProfileData] = useState(null);
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [editArtistForm, setEditArtistForm] = useState({
    name: "",
    Bio: "",
    Specialty: "",
  });
  const [error, setError] = useState(null);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    appointment_date: "",
    service_id: "",
    artist_id: "",
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();
  const { userToken, logan, logout } = useAuth();

  useEffect(() => {
    const token = userToken?.token;
    const userId = userToken?.decoded.userId;

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, usersRes, artistsRes, servicesRes, appointmentsRes] =
          await Promise.all([
            getProfile(token),
            isAdmin ? getAllUsers(token) : Promise.resolve({ success: false }),
            getAllArtists(token),
            getAllServices(token),
            isAdmin
              ? getAllAppointments(token)
              : getUserAppointments(userId, token),
          ]);

        if (profileRes.success) {
          setProfileData(profileRes.data);
          setEmail(profileRes.data.email);
        } else {
          console.error(
            "Error retrieving profile",
            profileRes.message
          );
        }

        if (usersRes.success && Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
          setFilteredUsers(usersRes.data);
        } else if (isAdmin) {
          console.error("Expected array of users, received:", usersRes);
          setError("Error trying to recover users. Unexpected behavior.");
        }

        if (artistsRes.success && Array.isArray(artistsRes.data)) {
          setArtists(artistsRes.data);
        } else {
          console.error("Expected array of artists, received:", artistsRes);
          setError("Error recovering artists. Unexpected behavior.");
        }

        if (servicesRes.success && Array.isArray(servicesRes.data)) {
          setServices(servicesRes.data);
        } else {
          console.error("Expected array of services, received:", servicesRes);
          setError("Error retrieving services. Unexpected behavior.");
        }

        if (appointmentsRes.success) {
          setUserAppointments(appointmentsRes.data);
        } else {
          setError(
            isAdmin
              ? "Error recovering appointments."
              : "Error recovering user appointments."
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, [editing, userToken, navigate, isAdmin]);

  const editInputHandler = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitChanges = async () => {
    try {
      const response = await updateProfile(profileData, userToken.token);
      if (response.success) setEditing(false);
      else console.log("Error saving data:", response.error);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditUserClick = (user) => {
    setEditingUser(editingUser === user.id ? null : user.id);
    setEditForm(
      editingUser === user.id
        ? { first_name: "", last_name: "", email: "" }
        : user
    );
  };

  const handleEditUserChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserById(
        { id: editingUser, ...editForm },
        userToken.token
      );
      if (response.success) {
        const updatedUsers = users.map((user) =>
          user.id === editingUser ? { ...user, ...editForm } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setEditingUser(null);
      } else {
        console.error("Error updating profile:", response.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteUserClick = async (userId) => {
    try {
      const response = await deleteUserById(userId, userToken.token);
      if (response.success) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error("Error deleting user:", response.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateArtist = async () => {
    try {
      const response = await createArtist(editArtistForm, userToken.token);
      if (response.success) {
        setArtists([...artists, response.data]);
        setShowArtistForm(false);
        setEditArtistForm({ name: "", Bio: "", Specialty: "" });
      } else {
        console.error("Error creating artist:", response.message);
      }
    } catch (error) {
      console.error("Error during application:", error);
    }
  };

  const handleEditArtistClick = (artist) => {
    setEditingArtist(editingArtist === artist.id ? null : artist.id);
    setEditArtistForm(
      editingArtist === artist.id
        ? { name: "", Bio: "", Specialty: "" }
        : artist
    );
  };

  const handleEditArtistChange = (e) =>
    setEditArtistForm({ ...editArtistForm, [e.target.name]: e.target.value });

  const handleEditArtistSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateArtistById(
        { id: editingArtist, ...editArtistForm },
        userToken.token
      );
      if (response.success) {
        const updatedArtists = artists.map((artist) =>
          artist.id === editingArtist
            ? { ...artist, ...editArtistForm }
            : artist
        );
        setArtists(updatedArtists);
        setEditingArtist(null);
      } else {
        console.error("Error updating artist info:", response.message);
      }
    } catch (error) {
      console.error("Error updating artist info:", error);
    }
  };

  const handleDeleteArtistClick = async (artistId) => {
    try {
      const response = await deleteArtistById(artistId, userToken.token);
      if (response.success) {
        const updatedArtists = artists.filter(
          (artist) => artist.id !== artistId
        );
        setArtists(updatedArtists);
      } else {
        console.error("Error deleting artist:", response.message);
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await createAppointment(
        { ...newAppointment, user_id: profileData.id },
        userToken.token
      );
      if (response.success) {
        setUserAppointments([...userAppointments, response.appointment]);
        setNewAppointment({
          appointment_date: "",
          service_id: "",
          artist_id: "",
        });
      } else {
        setError("Error creating the appointment.");
      }
    } catch (error) {
      setError("Error creating the appointmnet.");
    }
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setNewAppointment({
      appointment_date: appointment.appointment_date,
      service_id: appointment.service_id || "",
      artist_id: appointment.artist_id || "",
    });
  };

  const handleEditAppointmentChange = (e) =>
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value || "",
    });

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointmentById(
        { id: editingAppointment, ...newAppointment },
        userToken.token
      );
      if (response.success) {
        const updatedAppointments = userAppointments.map((appointment) =>
          appointment.id === editingAppointment
            ? { ...appointment, ...newAppointment }
            : appointment
        );
        setUserAppointments(updatedAppointments);
        setEditingAppointment(null);
      } else {
        setError("Error updating appointment.");
      }
    } catch (error) {
      setError("Error updating appopintment.");
    }
  };

  const handleDeleteAppointmentClick = async (appointmentId) => {
    try {
      const response = await deleteAppointmentById(
        appointmentId,
        userToken.token
      );
      if (response.success) {
        setUserAppointments(
          userAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
      } else {
        setError("Error deleting appointment.");
      }
    } catch (error) {
      setError("Error deleting appointment.");
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => {
              setShowUsers(false);
              setEditing(false);
              setShowArtists(false);
              setShowAppointments(false);
            }}
          >
            Tattoo Studio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAdmin ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowUsers(true);
                      setShowArtists(false);
                      setShowAppointments(false);
                      navigate("/admin");
                    }}
                  >
                    Users
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowArtists(true);
                      setShowUsers(false);
                      setShowAppointments(false);
                      navigate("/admin");
                    }}
                  >
                    Artists
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowAppointments(true);
                      setShowUsers(false);
                      setShowArtists(false);
                      navigate("/admin");
                    }}
                  >
                    Appointments
                  </Nav.Link>{" "}
                  {}
                  <Nav.Link as={Link} to="/Appointments">
                    Services
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/Appointments">
                    Services
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Gallery">
                    Gallery
                  </Nav.Link>
                  <Nav.Link as={Link} to="/artistas">
                    Artists
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowAppointments(true);
                      setShowUsers(false);
                      setShowArtists(false);
                    }}
                  >
                    My Appointments
                  </Nav.Link>{" "}
                  {}
                </>
              )}
            </Nav>
            <Nav>
              <NavDropdown
                title={profileData.first_name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    logout();
                    navigate("/login");
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {editing ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitChanges();
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={editInputHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>LAST NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={editInputHandler}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId="formEmail">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={editInputHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        ) : showUsers ? (
          <UserList
            users={filteredUsers}
            filter={filter}
            setFilter={setFilter}
            handleEditUserClick={handleEditUserClick}
            handleDeleteUserClick={handleDeleteUserClick}
            editingUser={editingUser}
            handleEditUserSubmit={handleEditUserSubmit}
            handleEditUserChange={handleEditUserChange}
            editForm={editForm}
          />
        ) : showArtists ? (
          isAdmin ? (
            <ArtistList
              artists={artists}
              handleEditArtistClick={handleEditArtistClick}
              handleDeleteArtistClick={handleDeleteArtistClick}
              editingArtist={editingArtist}
              handleEditArtistSubmit={handleEditArtistSubmit}
              handleEditArtistChange={handleEditArtistChange}
              editArtistForm={editArtistForm}
              showArtistForm={showArtistForm}
              setShowArtistForm={setShowArtistForm}
              handleCreateArtist={handleCreateArtist}
            />
          ) : (
            <ArtistList artists={artists} />
          )
        ) : showAppointments ? (
          isAdmin ? (
            <AppointmentList
              appointments={userAppointments}
              users={users}
              services={services}
              artists={artists}
              handleEditAppointmentClick={handleEditAppointmentClick}
              handleDeleteAppointmentClick={handleDeleteAppointmentClick}
              editingAppointment={editingAppointment}
              handleEditAppointmentChange={handleEditAppointmentChange}
              handleEditAppointmentSubmit={handleEditAppointmentSubmit}
              newAppointment={newAppointment}
              handleCreateAppointment={handleCreateAppointment}
            />
          ) : (
            <div>
              <h3>MY APPOINTMENTS</h3>
              {userAppointments.map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <Card.Body>
                    <Card.Title>
                      {new Date(appointment.appointment_date).toLocaleString()}
                      <Button
                        className="ms-2"
                        onClick={() => handleEditAppointmentClick(appointment)}
                      >
                        EDIT
                      </Button>
                      <Button
                        className="ms-2"
                        onClick={() =>
                          handleDeleteAppointmentClick(appointment.id)
                        }
                      >
                        DELETE
                      </Button>
                    </Card.Title>
                    <Card.Text>
                      SERVICE{" "}
                      {appointment.service
                        ? appointment.service.service_name
                        : "NOT ASSIGNED"}
                    </Card.Text>
                    <Card.Text>
                      ARTIST{" "}
                      {appointment.artist
                        ? appointment.artist.name
                        : "NOT ASSIGNED"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <h3>Crear Nueva Cita</h3>
              <Form onSubmit={handleCreateAppointment}>
                <Form.Group controlId="formAppointmentDate">
                  <Form.Label>Fecha y Hora</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="appointment_date"
                    value={newAppointment.appointment_date}
                    onChange={handleEditAppointmentChange}
                  />
                </Form.Group>
                <Form.Group controlId="formServiceId">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Control
                    as="select"
                    name="service_id"
                    value={newAppointment.service_id}
                    onChange={handleEditAppointmentChange}
                  >
                    <option value="">Seleccionar Servicio</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.service_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formArtistId">
                  <Form.Label>Artista</Form.Label>
                  <Form.Control
                    as="select"
                    name="artist_id"
                    value={newAppointment.artist_id}
                    onChange={handleEditAppointmentChange}
                  >
                    <option value="">Seleccionar Artista</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {editingAppointment ? "Actualizar Cita" : "Crear Cita"}
                </Button>
              </Form>
            </div>
          )
        ) : (
          <Row className="justify-content-center">
            <h1>Bienvenido, {profileData.first_name}!</h1>
          </Row>
        )}

        {}
        {showArtistForm && (
          <Form className="my-4">
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editArtistForm.name}
                onChange={handleEditArtistChange}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                name="Bio"
                value={editArtistForm.Bio}
                onChange={handleEditArtistChange}
              />
            </Form.Group>
            <Form.Group controlId="formSpecialty">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                type="text"
                name="Specialty"
                value={editArtistForm.Specialty}
                onChange={handleEditArtistChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreateArtist}>
              Crear Artista
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
}
