public interface IAppointmentsService
{
    int Add(AppointmentAddRequest model, int userId);
    void Update(AppointmentUpdateRequest model, int userId);
    void UpdateIsCanceled(int id, bool isCanceled, int userId);
    void UpdateIsConfirmed(int id, bool isConfirmed, int userId);
    Appointment GetById(int id);
    Paged<Appointment> GetByScheduleId(int pageIndex, int pageSize, int scheduleId);
    Paged<Appointment> GetByOrgId(int pageIndex, int pageSize, int orgId);
    Paged<Appointment> GetByCustomerId(int pageIndex, int pageSize, int customerId);
    Paged<Appointment> GetByDateRange(int pageIndex, int pageSize, DateTime startDate, DateTime endDate);
    Paged<Appointment> GetByOrgIdCustomerId(int pageIndex, int pageSize, int orgId, int customerId);
}
