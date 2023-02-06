import React from "react";
import PropTypes from "prop-types";
import "./AppointmentCard.css";
import { Card } from "react-bootstrap";
import { Edit, Trash2, CheckCircle, XCircle, UserCheck, User, Truck, MapPin, Tool, Info, Clock, Clipboard } from "react-feather";
import { useNavigate } from "react-router-dom";

function AppointmentCard(props) {
  const anAppt = props.appt;

  const navigate = useNavigate();

  const handleDelete = () => {
    props.onDeleteClick(props.appt);
  };

  const handleEdit = () => {
    goToApptEditPage(anAppt);
  };

  const handleConfirm = () => {
    props.onConfirmClick(props.appt);
  };

  const goToApptEditPage = (anAppt) => {
    const apptData = {
      type: "APPT_INFO",
      state: anAppt,
    };
    navigate(`/appointment/${anAppt.id}`, apptData);
  };

  return (
    <React.Fragment>
      <Card className="mb-4 appt-card card-hover">
        <Card.Header>
          <h3 className="card-title mb-2 text-truncate-line-2">Appt Id: {anAppt.id}
          {anAppt.isConfirmed 
            ? (< CheckCircle size="15px" className="confirmed-item-icon" type="button" color="green" />)
            : (< XCircle size="15px" className="confirmed-item-icon" type="button" color="red" />)
          }
          </h3>
        </Card.Header>
        {props.currentUser.roles.includes("Customer") && (
          <Card.Body className="appt-card-body">
            <p className="card-text mb-2">
              <strong>
                <MapPin size="15px" /> : {anAppt.organization.name}
              </strong>
            </p>
            <p className="card-text mb-2">
              <strong>
                <Tool size="15px" /> : {anAppt.autoService.name}
              </strong>
            </p>
            <p className="card-text mb-2">
              <strong>
                <Clock size="15px" /> : {anAppt.startDateTime.slice(0,10)} : {anAppt.startDateTime.slice(11,16)}
              </strong>             
            </p>
            <p className="card-text mb-2">
              <Info size="15px" /> : {anAppt.schedule.name}
            </p>
            <p className="card-text mb-2">
              <Truck size="15px" /> : {anAppt.userVehicle.vin}
            </p>
            <p className="card-text mb-2">
              <Clipboard size="15px" /> : {anAppt.notes}
            </p>
          </Card.Body>
        )}
        {props.currentUser.roles.includes("OrgAdmin") && (
          <Card.Body className="appt-card-body">
            <p className="card-text mb-2"> 
              <strong>
                <User size="15px" /> : {anAppt.customer.firstName} {anAppt.customer.lastName}
              </strong>
            </p>
            <p className="card-text mb-2">
              <strong>
                <Tool size="15px" /> : {anAppt.autoService.name}
              </strong>
            </p>
            <p className="card-text mb-2">
              <strong>
                <Clock size="15px" /> : {anAppt.startDateTime.slice(0,10)} : {anAppt.startDateTime.slice(11,16)}
              </strong>             
            </p>
            <p className="card-text mb-2">
              <Info size="15px" /> : {anAppt.schedule.name}
            </p>
            <p className="card-text mb-2">
              <Truck size="15px" /> : {anAppt.userVehicle.vin}
            </p>
            <p className="card-text mb-2">
              <Clipboard size="15px" /> : {anAppt.notes}
            </p>
          </Card.Body>
        )}
        <Card.Footer className="appt-card-footer">
          <Edit
            size="30px"
            className="edit-item-icon"
            type="button"
            color="purple"
            data-page={anAppt.id}
            onClick={handleEdit}
          >
            Edit
          </Edit>
          <Trash2
            size="30px"
            className="delete-item-icon"
            type="button"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Trash2>
          {(!anAppt.isConfirmed) && (props.currentUser.roles.includes("SysAdmin") ||
              props.currentUser.roles.includes("OrgAdmin")) && (
            <UserCheck
              size="30px"
              className="confirm-item-icon"
              type="button"
              color="green"
              onClick={handleConfirm}
            >
              Confirm
            </UserCheck>
          )}
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}

AppointmentCard.propTypes = {
  orgId: PropTypes.number.isRequired,
  appt: PropTypes.shape({
    id: PropTypes.number.isRequired,
    notes: PropTypes.string,
    userVehicle: PropTypes.shape({
      vin: PropTypes.string.isRequired,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    autoService: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    schedule: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    customer: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    startDateTime: PropTypes.string.isRequired,
    isConfirmed: PropTypes.bool.isRequired
  }),

  currentUser: PropTypes.shape({
    roles: PropTypes.shape({
      0: PropTypes.string.isRequired,
      1: PropTypes.string,
      includes: PropTypes.func,
    }),
  }),

  onDeleteClick: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired
};

export default AppointmentCard;
