import { useState } from "react";

import Todo from "../types/Todo";
import { updateTodo } from "../module/api";
import { UpdateTodo } from "../types/UpdateTodo";

type TaskProps = {
  todo: Todo
}

const Task = (props: TaskProps) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [updateState, setUpdateState] = useState<UpdateTodo>({
    id: props.todo.id,
    title: props.todo.title,
    description: props.todo.description,
    finished: props.todo.finished
  });

  const editHandler = async () => {
      if(isEdit) {
        const todo = await updateTodo(updateState);
        setUpdateState(todo);
      } 
      setIsEdit(!isEdit);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdateState({ ...updateState, [name]: value });
  };

  return (
    <li className="mb-2 flex justify-start border rounded" key={updateState.id}>
      <input type="checkbox" className="m-2 w-4 h-4" checked={Boolean(updateState.finished)}/>
      <div className="flex flex-col">
        {isEdit ? 
        <input name="title" value={updateState.title} onChange={handleChange} /> : 
        <div className="flex justify-start text-xl text-bold">{updateState.title}</div>
        }
        {isEdit ? 
        <textarea name="description" onChange={handleChange}>{updateState.description}</textarea> : 
        <div>
          {updateState.description ? updateState.description : ""}
        </div>
        }
      </div>
      <div className="flex items-center">
        <button onClick={editHandler}>{isEdit ? "保存する" : "編集する"}</button>
      </div>
    </li>
  )
}

export default Task;