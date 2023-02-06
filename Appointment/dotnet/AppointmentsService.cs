public class AppointmentsService : IAppointmentsService
{
    IDataProvider _data = null;

    public AppointmentsService(IDataProvider data)
    {
        _data = data;
    }

    public Paged<Appointment> GetByOrgIdCustomerId(int pageIndex, int pageSize, int orgId, int customerId)
    {
        Paged<Appointment> pagedResult = null;
        List<Appointment> result = null;

        int totalCount = 0;

        string procName = "[dbo].[Appointments_Select_ByOrgId_CustomerId]";
        _data.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@OrgId", orgId);
                col.AddWithValue("@CustomerId", customerId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Appointment appointment = MapSingleAppointment(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Appointment>();
                }
                result.Add(appointment);
            });
        if (result != null)
        {
            pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }

    public Paged<Appointment> GetByDateRange(int pageIndex, int pageSize, DateTime startDate, DateTime endDate)
    {
        Paged<Appointment> pagedResult = null;
        List<Appointment> result = null;

        int totalCount = 0;

        string procName = "[dbo].[Appointments_Select_ByDateRange]";
        _data.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@StartDate", startDate);
                col.AddWithValue("@EndDate", endDate);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Appointment appointment = MapSingleAppointment(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Appointment>();
                }
                result.Add(appointment);
            });
        if (result != null)
        {
            pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }

    public Paged<Appointment> GetByCustomerId(int pageIndex, int pageSize, int customerId)
    {
        Paged<Appointment> pagedResult = null;
        List<Appointment> result = null;

        int totalCount = 0;

        string procName = "[dbo].[Appointments_Select_ByCustomerId]";
        _data.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@CustomerId", customerId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Appointment appointment = MapSingleAppointment(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Appointment>();
                }
                result.Add(appointment);
            });
        if (result != null)
        {
            pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }

    public Paged<Appointment> GetByOrgId(int pageIndex, int pageSize, int orgId)
    {
        Paged<Appointment> pagedResult = null;
        List<Appointment> result = null;

        int totalCount = 0;

        string procName = "[dbo].[Appointments_Select_ByOrgId]";
        _data.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@OrgId", orgId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Appointment appointment = MapSingleAppointment(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Appointment>();
                }
                result.Add(appointment);
            });
        if (result != null)
        {
            pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }

    public Paged<Appointment> GetByScheduleId(int pageIndex, int pageSize, int scheduleId)
    {
        Paged<Appointment> pagedResult = null;
        List<Appointment> result = null;

        int totalCount = 0;

        string procName = "[dbo].[Appointments_Select_ByScheduleId]";
        _data.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@ScheduleId", scheduleId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Appointment appointment = MapSingleAppointment(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (result == null)
                {
                    result = new List<Appointment>();
                }
                result.Add(appointment);
            });
        if (result != null)
        {
            pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }

    public Appointment GetById(int id)
    {
        string procName = "[dbo].[Appointments_Select_ById]";

        Appointment appointment = null;

        _data.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                appointment = MapSingleAppointment(reader, ref index);

            });
        return appointment;
    }

    public void UpdateIsConfirmed(int id, bool isConfirmed, int userId)
    {
        string procName = "[dbo].[Appointments_Update_IsConfirmed]";
        _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@IsConfirmed", isConfirmed);
                col.AddWithValue("@ModifiedBy", userId);
            }, returnParameters: null);
    }

    public void UpdateIsCanceled(int id, bool isCanceled, int userId)
    {
        string procName = "[dbo].[Appointments_Update_IsCanceled]";
        _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@IsCanceled", isCanceled);
                col.AddWithValue("@ModifiedBy", userId);
            }, returnParameters: null);
    }

    public void Update(AppointmentUpdateRequest model, int userId)
    {
        string procName = "[dbo].[Appointments_Update]";
        _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@IsConfirmed", model.IsConfirmed);
                col.AddWithValue("@IsCanceled", model.IsCanceled);
                col.AddWithValue("@ModifiedBy", userId);
            }, returnParameters: null);
    }

    public int Add(AppointmentAddRequest model, int userId)
    {
        int id = 0;

        string procName = "[dbo].[Appointments_Insert]";
        _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
        return id;
    }

    private static void AddCommonParams(AppointmentAddRequest model, SqlParameterCollection col)
    {
        col.AddWithValue("@Notes", model.Notes);
        col.AddWithValue("@ScheduleId", model.ScheduleId);
        col.AddWithValue("@ServiceId", model.ServiceId);
        col.AddWithValue("@LocationId", model.LocationId);
        col.AddWithValue("@CustomerId", model.CustomerId);
        col.AddWithValue("@UserVehicleId", model.UserVehicleId);
        col.AddWithValue("@ContactTypeId", model.ContactTypeId);
        col.AddWithValue("@ContactInfo", model.ContactInfo);
        col.AddWithValue("@StartDateTime", model.StartDateTime);
        col.AddWithValue("@EstimatedDuration", model.EstimatedDuration);
    }

    private static Appointment MapSingleAppointment(IDataReader reader, ref int startingIndex)
    {
        Appointment appointment = new Appointment();

        appointment.Id = reader.GetSafeInt32(startingIndex++);
        appointment.Notes = reader.GetSafeString(startingIndex++);

        appointment.Schedule = new BaseSchedule();
        appointment.Schedule.Id = reader.GetSafeInt32(startingIndex++);
        appointment.Schedule.Name = reader.GetSafeString(startingIndex++);
        appointment.Schedule.Description = reader.GetSafeString(startingIndex++);

        appointment.Organization = new LookUp();
        appointment.Organization.Id = reader.GetSafeInt32(startingIndex++);
        appointment.Organization.Name = reader.GetSafeString(startingIndex++);

        appointment.AutoService = new BaseAutoService();
        appointment.AutoService.Id = reader.GetSafeInt32(startingIndex++);
        appointment.AutoService.Name = reader.GetSafeString(startingIndex++);
        appointment.AutoService.SKU = reader.GetSafeString(startingIndex++);
        appointment.AutoService.Description = reader.GetSafeString(startingIndex++);
        appointment.AutoService.UnitCost = reader.GetSafeDecimal(startingIndex++);

        appointment.Location = new BaseLocation();
        appointment.Location.Id = reader.GetSafeInt32(startingIndex++);
        appointment.Location.LineOne = reader.GetSafeString(startingIndex++);
        appointment.Location.LineTwo = reader.GetSafeString(startingIndex++);
        appointment.Location.City = reader.GetSafeString(startingIndex++);
        appointment.Location.StateId = reader.GetSafeInt32(startingIndex++);
        appointment.Location.State = reader.GetSafeString(startingIndex++);
        appointment.Location.Zip = reader.GetSafeString(startingIndex++);

        appointment.Customer = new BaseUserEmail();
        appointment.Customer.Id = reader.GetSafeInt32(startingIndex++);
        appointment.Customer.FirstName = reader.GetSafeString(startingIndex++);
        appointment.Customer.MI = reader.GetSafeString(startingIndex++);
        appointment.Customer.LastName = reader.GetSafeString(startingIndex++);
        appointment.Customer.Email = reader.GetSafeString(startingIndex++);
        appointment.Customer.AvatarUrl = reader.GetSafeString(startingIndex++);

        appointment.UserVehicle = new BaseUserVehicle();
        appointment.UserVehicle.Id = reader.GetSafeInt32(startingIndex++);
        appointment.UserVehicle.VIN = reader.GetSafeString(startingIndex++);
        appointment.UserVehicle.Color = reader.GetSafeString(startingIndex++);
        appointment.UserVehicle.LicensePlate = reader.GetSafeString(startingIndex++);

        appointment.ContactType = new LookUp();
        appointment.ContactType.Id = reader.GetSafeInt32(startingIndex++);
        appointment.ContactType.Name = reader.GetSafeString(startingIndex++);

        appointment.ContactInfo = reader.GetSafeString(startingIndex++);
        appointment.StartDateTime = reader.GetSafeDateTime(startingIndex++);
        appointment.EstimatedDuration = reader.GetSafeInt32(startingIndex++);

        appointment.IsConfirmed = reader.GetSafeBool(startingIndex++);
        appointment.IsCanceled = reader.GetSafeBool(startingIndex++);

        appointment.CreatedBy = reader.GetSafeInt32(startingIndex++);
        appointment.ModifiedBy = reader.GetSafeInt32(startingIndex++);
        appointment.DateCreated = reader.GetSafeDateTime(startingIndex++);
        appointment.DateModified = reader.GetSafeDateTime(startingIndex++);

        return appointment;
    }
}
