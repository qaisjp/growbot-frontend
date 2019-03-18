import React, {useState} from "react";

import Modal from "../../components/Modal/Modal";

const Scheduler = () => {
  const [scheduleEventModalOpen, scheduleEventModalVisible] = useState(false);

  const createScheduleEventModalContent = () => {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }

  const createScheduleEventModalActions = () => {
  }

  return (
    <div className="content">
      <button onClick={()=>scheduleEventModalVisible(true)}>Schedule</button>
      <Modal
        open={scheduleEventModalOpen}
        close={()=>scheduleEventModalVisible(false)}
        title="Schedule Event"
        content={createScheduleEventModalContent()}
        actions={createScheduleEventModalActions()}/>
    </div>
  )

};

export default Scheduler;