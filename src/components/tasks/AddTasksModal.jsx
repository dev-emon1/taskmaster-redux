import React from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";

const AddTasksModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Hello Modal Title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="w-full"
              {...register("name")}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default AddTasksModal;
