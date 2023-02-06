-- =============================================
-- Author:	Seong Gwon
-- Create date: 1/10/2023
-- Description:	Update existing Appointment input
-- Code Reviewer: Kevin Raya
-- =============================================

ALTER PROC [dbo].[Appointments_Update]

		@Notes nvarchar(500)
		,@ScheduleId int
		,@ServiceId int
		,@LocationId int
		,@CustomerId int
		,@UserVehicleId int
		,@ContactTypeId int
		,@ContactInfo nvarchar(50)
		,@StartDateTime datetime2(7)
		,@EstimatedDuration int
		,@IsConfirmed bit
		,@IsCanceled bit
		,@ModifiedBy int
		,@Id int
    
as

/*---------------TEST CODE------------------

	Declare @Id int = 11
		,@Notes nvarchar(500) = 'SQLTestNotes1Upd'
		,@ScheduleId int = 5
		,@ServiceId int = 2
		,@LocationId int = 2
		,@CustomerId int = 89
		,@UserVehicleId int = 19
		,@ContactTypeId int = 1
		,@ContactInfo nvarchar(50) = '2130001234'
		,@StartDateTime datetime2(7) = '2023-1-10'
		,@EstimatedDuration int = 30
		,@IsConfirmed bit = 1
		,@IsCanceled bit = 1
		,@ModifiedBy int = 5

	Execute [dbo].[Appointments_Update]		@Notes
											,@ScheduleId
											,@ServiceId
											,@LocationId
											,@CustomerId
											,@UserVehicleId
											,@ContactTypeId
											,@ContactInfo
											,@StartDateTime
											,@EstimatedDuration
											,@IsConfirmed
											,@IsCanceled
											,@ModifiedBy
											,@Id

	Select *
	From dbo.Appointments

	Execute [dbo].[Appointments_Select_ById] @Id
		
*/

BEGIN

		Declare @datNow datetime2 = getutcdate()

		UPDATE	[dbo].[Appointments]
		SET		[Notes] = @Notes
				,[ScheduleId] = @ScheduleId
				,[ServiceId] = @ServiceId
				,[LocationId] = @LocationId
				,[CustomerId] = @CustomerId
				,[UserVehicleId] = @UserVehicleId
				,[ContactTypeId] = @ContactTypeId
				,[ContactInfo] = @ContactInfo
				,[StartDateTime] = @StartDateTime
				,[EstimatedDuration] = @EstimatedDuration
				,[IsConfirmed] = @IsConfirmed
				,[IsCanceled] = @IsCanceled
				,[ModifiedBy] = @ModifiedBy
				,[DateModified] = @datNow
		WHERE	Id = @Id

END
