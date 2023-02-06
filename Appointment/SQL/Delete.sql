-- =============================================
-- Author:	Seong Gwon
-- Create date: 1/10/2023
-- Description:	Update existing Appointment input by IsCanceled as search input
-- Code Reviewer: Kevin Raya
-- =============================================

ALTER PROC [dbo].[Appointments_Update_IsCanceled]
			
		@IsCanceled bit
		,@ModifiedBy int
		,@Id int

as

/*---------------TEST CODE------------------

	Declare @Id int = 11
		,@IsCanceled bit = 1
		,@ModifiedBy int = 5

	Execute [dbo].[Appointments_Update_IsCanceled]		@IsCanceled
														,@ModifiedBy
														,@Id

	Select *
	From dbo.Appointments

	Execute [dbo].[Appointments_Select_ById] @Id
		
*/

BEGIN

		Declare @datNow datetime2 = getutcdate()

		UPDATE	[dbo].[Appointments]
		SET		[IsCanceled] = @IsCanceled
				,[ModifiedBy] = @ModifiedBy
				,[DateModified] = @datNow
		WHERE	Id = @Id

END
