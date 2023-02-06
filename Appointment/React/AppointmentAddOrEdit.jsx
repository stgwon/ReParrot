import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Col, Row, Card, Form, FormGroup, Button, } from "react-bootstrap";
import { useFormik } from "formik";
import AppointmentFormSchema from "schemas/appointmentFormSchema";
import appointmentService from "services/appointmentService";
import userVehicleService from "services/userVehicleService";
import organizationService from "services/organizationService";
import autoServicesService from "services/autoServicesService";
import scheduleService from "services/scheduleService";
import lookUpService from "services/lookUpService";
import toastr from "toastr";

function AppointmentAddOrEdit(props) {
    const navigate = useNavigate();
    const apptState = useLocation();
    const apptIdFromUrl = useParams();
    const [isCreatingNew, setIsCreatingNew] = useState(true);

    const [formData, setFormData] = useState({
        notes: "",
        scheduleId: 0,
        serviceId: 0,
        organizationId: 0,
        customerId: props.currentUser.id,
        userVehicleId: 0,
        contactTypeId: 0,
        contactInfo: "",
        startDate: "",
        startTime: "",
        estimatedDuration: 0,
    });
    
    const [userVehicleData, setUserVehicleData] = useState([]);
    const [organizationData, setOrganizationData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [scheduleData, setScheduleDatar] = useState([]);
    const [contactTypeData, setContactTypeData] = useState([]);
    const [orgId, setOrgId] = useState(0);
    const [locationId, setLocationId] = useState(0);

    useEffect(() => {
        if (apptState?.state) {
            setFormData((prevState) => {
                const currFormData = { ...prevState }
                currFormData.notes = apptState.state.notes
                currFormData.scheduleId = apptState.state.schedule.id
                currFormData.serviceId = apptState.state.autoService.id
                currFormData.organizationId = apptState.state.organization.id
                currFormData.userVehicleId = apptState.state.userVehicle.id
                currFormData.contactTypeId = apptState.state.contactType.id
                currFormData.contactInfo = apptState.state.contactInfo
                currFormData.startDate = apptState.state.startDateTime.slice(0,10)
                currFormData.startTime = apptState.state.startDateTime.slice(11,16)
                currFormData.estimatedDuration = apptState.state.estimatedDuration
                return currFormData
            });

            setOrgId(apptState.state.organization.id)
            setLocationId(apptState.state.location.id)
            setIsCreatingNew(false);
        }
    }, [apptState]);

    const Formik = useFormik({
        initialValues: formData,
        enableReinitialize: true,
        validationSchema: AppointmentFormSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            let payload = {
                ...values,
                locationId: locationId,
                startDateTime: `${values.startDate}T${values.startTime}`
            };
            delete payload.organizationId
            delete payload.startDate
            delete payload.startTime

            if(isCreatingNew) {
                appointmentService
                    .addAppointment(payload)
                    .then(onAddAppointmentSuccess)
                    .catch(onAddAppointmentError);
            }
            else {
                appointmentService
                    .editAppointment(apptIdFromUrl.apptId, payload)
                    .then(onUpdateAppointmentSuccess)
                    .catch(onUpdateAppointmentError);
            }
        }
    });

    const onAddAppointmentSuccess = (response) => {
        toastr.success("New appointment added successfully!");
        navigate("/appointments");
    };

    const onAddAppointmentError = (error) => {
        toastr.error("Error adding new appointment...");
    };

    const onUpdateAppointmentSuccess = (response) => {
        toastr.success("Current appointment updated successfully!");
        navigate("/appointments");
    };

    const onUpdateAppointmentError = (error) => {
        toastr.error("Error updating current appointment...");
    };
    
    useEffect(() => {
        if (!orgId) {      
            userVehicleService
                .getAllByOwnerIdNoPag(props.currentUser.id)
                .then(onUserVehiclesGetAllByOwnerIdSuccess)
                .catch(onUserVehiclesGetAllByOwnerIdError);
            organizationService
                .getAllOrganizationNoPag()
                .then(onOrgsGetAllSuccess)
                .catch(onOrgsGetAllError);
            lookUpService
                .LookUp(["ContactTypes"])
                .then(onContactTypeLookupSuccess)
                .catch(onContactTypeLookupError);
        }
        else {
            autoServicesService
                .getAllByOrgIdNoPag(orgId)
                .then(onAutoServicesGetAllByOrgIdSuccess)
                .catch(onAutoServicesGetAllByOrgIdError);
            scheduleService
                .getScheduleByOrgIdNoPag(orgId)
                .then(onSchedulesGetAllByOrgIdSuccess)
                .catch(onSchedulesGetAllByOrgIdError);
        }
    }, [orgId]);

    const onUserVehiclesGetAllByOwnerIdSuccess = (response) => {  
        setUserVehicleData(response.items.map(mapUserVehicleArr));
    };

    const onUserVehiclesGetAllByOwnerIdError = (error) => {
        console.log("UserVehiclesGetAllByOwnerId Error: ", error);
    };

    const mapUserVehicleArr = (aVehicle) => {
        return (
            <option key={aVehicle.id} value={aVehicle.id}>
                {aVehicle.vin}
            </option>
        );
    }

    const onOrgsGetAllSuccess = (response) => {  
        setOrganizationData(response.items.map(mapOrganizationArr));
    };

    const onOrgsGetAllError = (error) => {
        console.log("OrgsGetAll Error: ", error);
    };

    const mapOrganizationArr = (anOrg) => {
        return (
            <option key={anOrg.id} value={anOrg.id}>
                {anOrg.name}
            </option>
        );
    }

    const onAutoServicesGetAllByOrgIdSuccess = (response) => {
        setServiceData(response.items.map(mapAutoServiceArr));
    };

    const onAutoServicesGetAllByOrgIdError = (error) => {
        console.log("AutoServicesGetAllByOrgId Error: ", error);
    };

    const mapAutoServiceArr = (aService) => {
        return (
            <option key={aService.id} value={aService.id}>
                {aService.name}
            </option>
        );
    }

    const onSchedulesGetAllByOrgIdSuccess = (response) => { 
        setScheduleDatar(response.items.map(mapScheduleArr));
    };

    const onSchedulesGetAllByOrgIdError = (error) => {
        console.log("SchedulesGetAllByOrgId Error: ", error);
    };

    const mapScheduleArr = (aSchedule) => {
        return (
            <option key={aSchedule.id} value={aSchedule.id}>
                {aSchedule.name} (Start:{aSchedule.startDate.slice(0,10)} End:{aSchedule.endDate.slice(0,10)})
            </option>
        );
    }

    const onContactTypeLookupSuccess = (response) => {  
        setContactTypeData(response.item.contactTypes.map(mapContactTypeArr));
    };

    const onContactTypeLookupError = (error) => {
        console.log("ContactTypeLookup Error: ", error);
    };

    const mapContactTypeArr = (type) => {
        return (
            <option key={type.id} value={type.id}>
                {type.name}
            </option>
        );
    }

    const handleOrgChange = (e) => {
        setOrgId(e.target.value)
        Formik.setFieldValue("organizationId", e.target.value);

        organizationService.getByIdOrganization(e.target.value)
        .then(onOrgsGetByIdSuccess)
        .catch(onOrgsGetByIdError);
    };

    const onOrgsGetByIdSuccess = (response) => {  
        setLocationId(response.item.location.id);
    };

    const onOrgsGetByIdError = (error) => {
        console.log("OrgsGetById Error: ", error);
    };

    const handleServiceChange = (e) => {        
        autoServicesService.getByIdAutoService(e.target.value)
        .then(onAutoServicesGetByIdSuccess)
        .catch(onAutoServicesGetByIdError);
    };
    
    const onAutoServicesGetByIdSuccess = (response) => {  
        Formik.setFieldValue("serviceId", response.item.id);
        Formik.setFieldValue("estimatedDuration", response.item.estimatedDuration);
    };

    const onAutoServicesGetByIdError = (error) => {
        console.log("AutoServicesGetById Error: ", error);
    };

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Card>
                        <Card.Header>
                            {isCreatingNew ? <h2>New Appointment</h2> : <h2>Update Appointment</h2>}
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={Formik.handleSubmit}>
                                <Row className="mb-3">
                                    <FormGroup as={Col} md="3">
                                        <Form.Label>Vehicle</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-group form-select text-dark"
                                            id="userVehicleId"
                                            name="userVehicleId"
                                            value={Formik.values.userVehicleId}
                                            onChange={Formik.handleChange}
                                        >
                                            <option
                                                label="Select a vehicle"
                                                className="text-muted"
                                            ></option>
                                            {userVehicleData}
                                        </Form.Control>
                                        {Formik.errors.userVehicleId ? (
                                            <div>{Formik.errors.userVehicleId}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup as={Col} md="3">
                                        <Form.Label>Organization</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-group form-select text-dark"
                                            id="organizationId"
                                            name="organizationId"
                                            value={Formik.values.organizationId}
                                            onChange={handleOrgChange}
                                        >
                                            <option
                                                label="Select an organization"
                                                className="text-muted"
                                            ></option>
                                            {organizationData}
                                        </Form.Control>
                                        {Formik.errors.organizationId ? (
                                            <div>{Formik.errors.organizationId}</div>
                                        ) : null}
                                    </FormGroup>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Service</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-group form-select text-dark"
                                            id="serviceId"
                                            name="serviceId"
                                            value={Formik.values.serviceId}
                                            onChange={handleServiceChange}
                                        >
                                            <option
                                                label="Select a service"
                                                className="text-muted"
                                            ></option>
                                            {serviceData}
                                        </Form.Control>
                                        {Formik.errors.serviceId ? (
                                            <div>{Formik.errors.serviceId}</div>
                                        ) : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Schedule</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-group form-select text-dark"
                                            id="scheduleId"
                                            name="scheduleId"
                                            value={Formik.values.scheduleId}
                                            onChange={Formik.handleChange}
                                        >
                                            <option
                                                label="Select a schedule"
                                                className="text-muted"
                                            ></option>
                                            {scheduleData}
                                        </Form.Control>
                                        {Formik.errors.scheduleId ? (
                                            <div>{Formik.errors.scheduleId}</div>
                                        ) : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className="form-control"
                                            rows="4"
                                            id="notes"
                                            name="notes"
                                            value={Formik.values.notes}
                                            onChange={Formik.handleChange}
                                            placeholder="Provide a note about this appointment"
                                        />
                                        {Formik.errors.notes ? (
                                            <div>{Formik.errors.notes}</div>
                                        ) : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Contact Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-group form-select text-dark"
                                            id="contactTypeId"
                                            name="contactTypeId"
                                            value={Formik.values.contactTypeId}
                                            onChange={Formik.handleChange}
                                        >
                                            <option
                                                label="Select a contact type"
                                                className="text-muted"
                                            ></option>
                                            {contactTypeData}
                                        </Form.Control>
                                        {Formik.errors.contactTypeId ? (
                                            <div>{Formik.errors.contactTypeId}</div>
                                        ) : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Contact Info</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            id="contactInfo"
                                            name="contactInfo"
                                            value={Formik.values.contactInfo}
                                            onChange={Formik.handleChange}
                                            placeholder="Enter a contact info"
                                        />
                                        {Formik.errors.contactInfo ? (
                                            <div>{Formik.errors.contactInfo}</div>
                                        ) : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            className="form-control"
                                            id="startDate"
                                            name="startDate"
                                            value={Formik.values.startDate}
                                            onChange={Formik.handleChange}
                                        />
                                        {Formik.errors.startDate ? (
                                            <div>{Formik.errors.startDate}</div>
                                        ) : null}
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            className="form-control"
                                            id="startTime"
                                            name="startTime"
                                            value={Formik.values.startTime}
                                            onChange={Formik.handleChange}
                                        />
                                        {Formik.errors.startTime ? (
                                            <div>{Formik.errors.startTime}</div>
                                        ) : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mt-3">
                                    <Button variant="primary" type="submit" id="button">
                                        {isCreatingNew ? "Add new appointment" : "Update appointment"}
                                    </Button>
                                </Row>
                            </Form>      
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </React.Fragment>
    );
};

AppointmentAddOrEdit.propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number
    })
};

export default AppointmentAddOrEdit;
