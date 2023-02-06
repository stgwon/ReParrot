import * as Yup from "yup";

const AppointmentFormSchema = Yup.object().shape({
    customerId: Yup.number().typeError("Id needs to be number.").required("Customer id is required."),
    userVehicleId: Yup.number().typeError("Id needs to be number.").required("User vehicle id is required."),
    organizationId: Yup.number().typeError("Id needs to be number.").required("Organization id is required."),
    serviceId: Yup.number().typeError("Id needs to be number.").required("Service id is required."),
    estimatedDuration: Yup.number().typeError("Estimated duration needs to be number.").required("Estimated time (in minutes) is required."),
    scheduleId: Yup.number().typeError("Id needs to be number.").required("Schedule id is required."),
    notes: Yup.string().min(2).max(500).required("Note is required."),
    contactTypeId: Yup.number().typeError("Id needs to be number.").required("Contact type id is required."),
    contactInfo: Yup.string().min(2).max(50).required("Contact info is required."),
    startDate: Yup.string().required("Select a starting date."),
    startTime: Yup.string().required("Select a starting time.")
});

export default AppointmentFormSchema;
