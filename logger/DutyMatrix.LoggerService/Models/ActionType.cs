namespace DutyMatrix.LoggerService.Models
{
    public enum ActionType
    {
        LOGIN,
        LOGOUT,
        LOGIN_FAILED,

        PROFILE_UPDATED,
        SHIFT_VIEWED,
        LEAVE_REQUESTED,
        SHIFT_SWAP_REQUESTED,

        SHIFT_CREATED,
        SHIFT_ASSIGNED,
        SHIFT_UPDATED,
        SHIFT_DELETED,
        STATION_CREATED,
        STATION_UPDATED,

        LEAVE_APPROVED,
        LEAVE_REJECTED,
        SHIFT_SWAP_APPROVED,
        SHIFT_SWAP_REJECTED,

        FIR_CREATED,
        FIR_UPDATED,
        FIR_ASSIGNED,
        FIR_STATUS_UPDATED,
        FIR_CLOSED
    }
}
