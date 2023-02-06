-- =============================================
-- Author:	Seong Gwon
-- Create date: 1/10/2023
-- Description:	Insert new Appointment input
-- Code Reviewer: Kevin Raya
-- =============================================

ALTER PROC [dbo].[Appointments_Insert]
			
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
		,@CreatedBy int
		,@ModifiedBy int
		,@Id int OUTPUT

as

/*---------------TEST CODE------------------

	Declare @Notes nvarchar(500) = 'SQLTestNotes5'
			,@ScheduleId int = 8
			,@ServiceId int = 2
			,@LocationId int = 2
			,@CustomerId int = 7
			,@UserVehicleId int = 2
			,@ContactTypeId int = 1
			,@ContactInfo nvarchar(50) = '2130001234'
			,@StartDateTime datetime2(7) = '2023-1-31'
			,@EstimatedDuration int = 30
			,@CreatedBy int = 1
			,@ModifiedBy int = 1
			,@Id int = 0

	Execute [dbo].[Appointments_Insert]		@Notes
											,@ScheduleId
											,@ServiceId
											,@LocationId
											,@CustomerId
											,@UserVehicleId
											,@ContactTypeId
											,@ContactInfo
											,@StartDateTime
											,@EstimatedDuration
											,@CreatedBy
											,@ModifiedBy
											,@Id OUTPUT
		
		Select *
		From dbo.Appointments

		Execute [dbo].[Appointments_Select_ById] @Id

*/

BEGIN
							
		INSERT INTO [dbo].[Appointments]
					([Notes]
					,[ScheduleId]
					,[ServiceId]
					,[LocationId]
					,[CustomerId]
					,[UserVehicleId]
					,[ContactTypeId]
					,[ContactInfo]
					,[StartDateTime]
					,[EstimatedDuration]
					,[CreatedBy]
					,[ModifiedBy])
			 VALUES
					(@Notes
					,@ScheduleId
					,@ServiceId
					,@LocationId
					,@CustomerId
					,@UserVehicleId
					,@ContactTypeId
					,@ContactInfo
					,@StartDateTime
					,@EstimatedDuration
					,@CreatedBy
					,@ModifiedBy)

			SET @Id = SCOPE_IDENTITY();

END
