// FPCC
import {
  useJoinRequestApprove,
  useJoinRequestIgnore,
} from 'common/dataHooks/useJoinRequests'

function DashboardJoinCardData({ joinRequest }) {
  const { onSubmit: ignoreRequest } = useJoinRequestIgnore()
  const { onSubmit: approveRequest } = useJoinRequestApprove()

  const handleApprove = (roleToAssign) => {
    approveRequest({ id: joinRequest.id, role: roleToAssign })
  }

  return {
    handleIgnore: () => ignoreRequest(joinRequest?.id),
    handleApprove,
  }
}

export default DashboardJoinCardData
