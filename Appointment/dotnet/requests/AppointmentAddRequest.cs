public class AppointmentAddRequest
{
    [Required]
    [StringLength(500, MinimumLength = 2)]
    public string Notes { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int ScheduleId { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int ServiceId { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int LocationId { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int CustomerId { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int UserVehicleId { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int ContactTypeId { get; set; }
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string ContactInfo { get; set; }
    [Required]
    [DataType(DataType.DateTime)]
    public DateTime StartDateTime { get; set; }
    [Required]
    [Range(1, int.MaxValue)]
    public int EstimatedDuration { get; set; }
    [Required]
    public bool IsConfirmed { get; set; }
    [Required]
    public bool IsCanceled { get; set; }
}
