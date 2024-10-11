import { todo, todoList } from "@/types/todo";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const URL = "http://localhost:4000/todos";
const Card = ({ todo, setTodos }: { todo: todo, setTodos:Dispatch<SetStateAction<todoList>> }) => {
  const updateTodo = async (todo: todo) => {
    await axios.patch(URL + `/${todo.id}`, { isDone: !todo.isDone });
    setTodos(prev => prev.map(data =>{
      if (data.id === todo.id) {
        return {...data, isDone:!todo.isDone}
      } else {
        return data
      }
    }))
  };
  const deleteTodo = async (id: string) => {
    await axios.patch(URL + `/${id}`);
    setTodos(prev => prev.filter(todo => todo.id !== id))
  };
  return (
    <div className="w-[200px] border">
      <p>{todo.id.slice(0,4)}</p>
      <p>{todo.contents}</p>
      <button
        className="border mr-4"
        onClick={() => {
          updateTodo(todo);
        }}
      >
        {todo.isDone ? "취소" : "완료"}
      </button>
      <button className="border"
        onClick={() => {
          deleteTodo(todo.id);
        }}>삭제</button>
    </div>
  );
};

export default Card;
