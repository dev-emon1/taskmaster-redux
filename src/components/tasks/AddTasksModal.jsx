import React from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTasks } from "../../redux/reducers/tasksReducer";

const AddTasksModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    dispatch(addTasks(data));

    reset();
    setIsOpen(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Hello Modal Title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded-md"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="w-full rounded-md"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="date" className="mb-2">
              Deadline
            </label>
            <input
              type="date"
              id="date"
              className="w-full rounded-md"
              {...register("date")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="assignedTo" className="mb-2">
              Assign To
            </label>
            <select
              id="assignedTo"
              className="w-full rounded-md"
              {...register("assignedTo")}
            >
              <option value="Md Aladin">Md Aladin</option>
              <option value="Emon Hossain">Emon Hossain</option>
              <option value="Ahmed">Ahmed</option>
              <option value="Moniruzzaman">Moniruzzaman</option>
              <option value="Jackson">Jackson</option>
              <option value="John Doe">John Doe</option>
              <option value="Mohammed">Mohammed</option>
              <option value="De Costa">De Costa</option>
            </select>
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="priority" className="mb-2">
              Priority
            </label>
            <select
              id="priority"
              className="w-full rounded-md"
              {...register("priority")}
            >
              <option defaultValue value="high">
                High
              </option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTasksModal;
