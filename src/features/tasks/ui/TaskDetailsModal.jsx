import React from "react";
import Modal from "../../../shared/ui/Modal";
import { useSelector } from "react-redux";

const TaskDetailsModal = ({ isOpen, setIsOpen, id }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const task = tasks.find((item) => item.id === id);
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={task?.title}>
        {task?.description}
      </Modal>
    </>
  );
};

export default TaskDetailsModal;
