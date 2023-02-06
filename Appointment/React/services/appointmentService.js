import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/appointments`;

const getAllByOrgIdCustomerId = (pageIndex, pageSize, orgId, customerId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/organization/customer/?pageIndex=${pageIndex}&pageSize=${pageSize}&orgId=${orgId}&customerId=${customerId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const getAllByOrgId = (pageIndex, pageSize, orgId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/organization/?pageIndex=${pageIndex}&pageSize=${pageSize}&orgId=${orgId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const getAllByCustomerId = (pageIndex, pageSize, customerId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/customer/?pageIndex=${pageIndex}&pageSize=${pageSize}&customerId=${customerId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const confirmAppointment = (id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/confirm/${id}?IsConfirmed=true`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const deleteAppointment = (id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/cancel/${id}?IsCanceled=true`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const editAppointment = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const addAppointment = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
};

const appointmentService = {
    addAppointment,
    editAppointment,
    deleteAppointment,
    confirmAppointment,
    getAllByCustomerId,
    getAllByOrgId,
    getAllByOrgIdCustomerId
};

export default appointmentService;
