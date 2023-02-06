public class Appointment
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public BaseSchedule Schedule { get; set; }
        public LookUp Organization { get; set; }
        public BaseAutoService AutoService { get; set; }
        public BaseLocation Location { get; set; }
        public BaseUserEmail Customer { get; set; }
        public BaseUserVehicle UserVehicle { get; set; }
        public LookUp ContactType { get; set; }
        public string ContactInfo { get; set; }
        public DateTime StartDateTime { get; set; }
        public int EstimatedDuration { get; set; }
        public bool IsConfirmed { get; set; }
        public bool IsCanceled { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
