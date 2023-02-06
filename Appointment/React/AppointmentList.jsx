import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { PlusCircle } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import "./AppointmentCard.css";
import PropTypes from "prop-types";
import appointmentService from "../../services/appointmentService";
import AppointmentCard from "./AppointmentCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";

function AppointmentList(props) {
  const navigate = useNavigate();
  const orgState = useLocation();

  const [pageData, setPageData] = useState({ appts: [], apptsComponents: [] })
  const [paginate, setPaginate] = useState({ index: 0, pageSize: 4, total: 0 });

  const mapAppointment = (anAppt) => {
    return (
      <Col lg={3} md={6} sm={12} key={"ApptId_" + anAppt.id}>
        <AppointmentCard
          appt={anAppt}
          orgId={anAppt.organization.id}
          currentUser={props.currentUser}
          onDeleteClick={onDeleteRequested}
          onConfirmClick={onConfirmRequested}
        />
      </Col>
    );
  };

  const onDeleteRequested = useCallback((anAppt) => {
    appointmentService
      .deleteAppointment(anAppt.id)
      .then(onDeleteApptSuccess(anAppt.id))
      .catch(onDeleteApptError);
  }, []);

  const onDeleteApptSuccess = (deletedApptId) => {
    return () => {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.appts = [...pd.appts];

        const idxOf = pd.appts.findIndex((anAppt) => {
          let result = false;
          if (anAppt.id === deletedApptId) {
            result = true;
          }
          return result;
        });

        if (idxOf >= 0) {
          pd.appts.splice(idxOf, 1);
          pd.apptsComponents = pd.appts.map(mapAppointment);
        }

        return pd;
      });
    };
  };

  const onDeleteApptError = (err) => {
    toastr.error("Deleting Organization Unsuccessful");
  };

  const onConfirmRequested = useCallback((anAppt) => {  
    appointmentService
      .confirmAppointment(anAppt.id)
      .then(onConfirmApptSuccess(anAppt.id))
      .catch(onConfirmApptError);
  }, []);

  const onConfirmApptSuccess = (confirmedApptId) => {
    toastr.success("Confirming Appointment Successful");

    return () => {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.appts = [...pd.appts];

        const idxOf = pd.appts.findIndex((anAppt) => {
          let result = false;
          if (anAppt.id === confirmedApptId) {
            result = true;
          }
          return result;
        });

        if (idxOf >= 0) {
          pd.appts[idxOf].isConfirmed = true;
          pd.apptsComponents = pd.appts.map(mapAppointment);
        }

        return pd;
      });
    };
  };

  const onConfirmApptError = (err) => {
    toastr.error("Confirming Appointment Unsuccessful");
  };

  useEffect(() => {
    if (orgState?.state) {
      appointmentService.getAllByOrgIdCustomerId(paginate.index, paginate.pageSize, orgState.state.id, props.currentUser.id)
      .then(onGetApptsByOrgIdSuccess)
      .catch(onGetApptsByOrgIdError);
    }
    else {
      appointmentService.getAllByCustomerId(paginate.index, paginate.pageSize, props.currentUser.id)
      .then(onGetApptsByCustomerIdSuccess)
      .catch(onGetApptsByCustomerIdError);
    }
  }, [paginate.index])

  const onGetApptsByCustomerIdSuccess = (data) => {
    let arrOfAppts = data.item.pagedItems;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.appts = arrOfAppts;
      pd.apptsComponents = arrOfAppts.map(mapAppointment);
      return pd;
    });

    setPaginate((prevState) => {
      const newPageData = {
        ...prevState,
        total: data.item.totalCount,
      };
      return newPageData;
    });
  };

  const onGetApptsByCustomerIdError = (err) => {
    toastr.error("Getting appointments from current organization was unsuccessful");
  };

  const onGetApptsByOrgIdSuccess = (data) => {
    let arrOfAppts = data.item.pagedItems;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.appts = arrOfAppts;
      pd.apptsComponents = arrOfAppts.map(mapAppointment);
      return pd;
    });

    setPaginate((prevState) => {
      const newPageData = {
        ...prevState,
        total: data.item.totalCount,
      };
      return newPageData;
    });
  };

  const onGetApptsByOrgIdError = (err) => {
    toastr.error("Getting appointments from current organization was unsuccessful");
  };

  const onPageChangeHandler = (pageNumber) => {
    setPaginate((prevState) => {
      const updatedPage = { ...prevState, index: pageNumber - 1 };
      return updatedPage;
    });
  };

  const handlePlus = () => {
    navigate("/appointment/add");
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          {orgState?.state ? (
            <h1 className="text org-name">Current Organization: {orgState.state.name}
              <PlusCircle
                size="30px"
                className="edit-item-icon"
                type="button"
                color="purple"
                onClick={handlePlus}
              >
                Add new appointment
              </PlusCircle>
            </h1>
          ) : (
          <h1 className="text">All Appointments
            <PlusCircle
              size="30px"
              className="add-item-icon"
              type="button"
              color="purple"
              onClick={handlePlus}
            >
              Add new appointment
            </PlusCircle>
          </h1>
          )}
        </Row>
        <Row className="mb-3 appt-card">{pageData.apptsComponents}</Row>
        <Row className="mb-3">
          <Col className="d-inline-flex mb-0 mx-3 top-0 right-0 justify-content-center">
            <div className="appt-pagination-container">
              <Pagination
                onChange={onPageChangeHandler}
                index={paginate.index + 1}
                total={paginate.total}
                pageSize={paginate.pageSize}
                totalCount={paginate.totalCount}
                locale={locale}
                className=" appt-pagination-top text-start my-4 mx-22"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

AppointmentList.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.shape({
      0: PropTypes.string.isRequired,
      1: PropTypes.string,
      includes: PropTypes.func,
    }),
  })
};

export default AppointmentList;
