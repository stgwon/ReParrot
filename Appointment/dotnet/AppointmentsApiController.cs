[Route("api/appointments")]
[ApiController]
public class AppointmentsApiController : BaseApiController
{
    private IAppointmentsService _service = null;
    private IAuthenticationService<int> _authService = null;

    public AppointmentsApiController(IAppointmentsService service
        , ILogger<AppointmentsApiController> logger
        , IAuthenticationService<int> authService) : base(logger)
    {
        _service = service;
        _authService = authService;
    }

    [HttpGet("organization/customer")]
    public ActionResult<ItemResponse<Paged<Appointment>>> GetByOrgIdCustomerId(int pageIndex, int pageSize, int orgId, int customerId)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            Paged<Appointment> page = _service.GetByOrgIdCustomerId(pageIndex, pageSize, orgId, customerId);

            if (page == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Paged<Appointment>> { Item = page };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}");
        }

        return StatusCode(iCode, response);
    }

    [HttpGet("date")]
    public ActionResult<ItemResponse<Paged<Appointment>>> GetByDateRange(int pageIndex, int pageSize, DateTime startDate, DateTime endDate)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            Paged<Appointment> page = _service.GetByDateRange(pageIndex, pageSize, startDate, endDate);

            if (page == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Paged<Appointment>> { Item = page };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}");
        }

        return StatusCode(iCode, response);
    }

    [HttpGet("customer")]
    public ActionResult<ItemResponse<Paged<Appointment>>> GetByCustomerId(int pageIndex, int pageSize, int customerId)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            Paged<Appointment> page = _service.GetByCustomerId(pageIndex, pageSize, customerId);

            if (page == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Paged<Appointment>> { Item = page };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}");
        }

        return StatusCode(iCode, response);
    }

    [HttpGet("organization")]
    public ActionResult<ItemResponse<Paged<Appointment>>> GetByOrgId(int pageIndex, int pageSize, int orgId)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            Paged<Appointment> page = _service.GetByOrgId(pageIndex, pageSize, orgId);

            if (page == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Paged<Appointment>> { Item = page };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}");
        }

        return StatusCode(iCode, response);
    }

    [HttpGet("schedule")]
    public ActionResult<ItemResponse<Paged<Appointment>>> GetByScheduleId(int pageIndex, int pageSize, int scheduleId)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            Paged<Appointment> page = _service.GetByScheduleId(pageIndex, pageSize, scheduleId);

            if (page == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Paged<Appointment>> { Item = page };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}");
        }

        return StatusCode(iCode, response);
    }

    [HttpGet("{id:int}")]
    public ActionResult<ItemResponse<Appointment>> GetById(int id)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            Appointment appointment = _service.GetById(id);

            if (appointment == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Appointment> { Item = appointment };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}");
        }

        return StatusCode(iCode, response);
    }

    [HttpPut("confirm/{id:int}")]
    public ActionResult<SuccessResponse> UpdateIsConfirmed(int id, bool isConfirmed)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            int userId = _authService.GetCurrentUserId();
            _service.UpdateIsConfirmed(id, isConfirmed, userId);
            response = new SuccessResponse();
        }
        catch (Exception ex)
        {
            iCode = 500;
            response = new ErrorResponse(ex.Message);
            base.Logger.LogError(ex.ToString());
        }

        return StatusCode(iCode, response);
    }

    [HttpPut("cancel/{id:int}")]
    public ActionResult<SuccessResponse> UpdateIsCanceled(int id, bool isCanceled)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            int userId = _authService.GetCurrentUserId();
            _service.UpdateIsCanceled(id, isCanceled, userId);
            response = new SuccessResponse();
        }
        catch (Exception ex)
        {
            iCode = 500;
            response = new ErrorResponse(ex.Message);
            base.Logger.LogError(ex.ToString());
        }

        return StatusCode(iCode, response);
    }

    [HttpPut("{id:int}")]
    public ActionResult<SuccessResponse> Update(AppointmentUpdateRequest model)
    {
        int iCode = 200;
        BaseResponse response = null;

        try
        {
            int userId = _authService.GetCurrentUserId();
            _service.Update(model, userId);
            response = new SuccessResponse();
        }
        catch (Exception ex)
        {
            iCode = 500;
            response = new ErrorResponse(ex.Message);
            base.Logger.LogError(ex.ToString());
        }

        return StatusCode(iCode, response);
    }

    [HttpPost]
    public ActionResult<ItemResponse<int>> Create(AppointmentAddRequest model)
    {
        ObjectResult result = null;

        try
        {
            int userId = _authService.GetCurrentUserId();

            int id = _service.Add(model, userId);
            ItemResponse<int> response = new ItemResponse<int>() { Item = id };

            result = Created201(response);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            ErrorResponse response = new ErrorResponse(ex.Message);

            result = StatusCode(500, response);
        }

        return result;
    }
}
