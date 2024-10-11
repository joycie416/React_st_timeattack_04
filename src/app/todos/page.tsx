"use client";

import { useEffect, useState } from "react";
import { todo, todoList } from "@/types/todo";
import axios from "axios";
import Card from "@/components/Card";

const URL = "http://localhost:4000/todos"
const page = () => {
  const [todos, setTodos] = useState<todoList>([]);
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const working: todoList = todos.filter((todo) => !todo?.isDone);
  const done: todoList = todos.filter((todo) => todo?.isDone);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(URL);
      setTodos(res.data);
    };
    fetchData();
  }, []);

  const addTodo = async (todo: todo) => {
    await axios.post(URL, todo)
  }
  const handleAdd = () => {
    const todo = {title, contents, id:crypto.randomUUID(), isDone:false}
    addTodo(todo)
    setTitle('')
    setContents('')
    setTodos(prev => [...prev, todo]);
  };

  return (
    <div>
      <div>
        <input
          className="border"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
        />
        <input
          className="border"
          placeholder="내용을 입력하세요"
          value={contents}
          onChange={(e) => {setContents(e.target.value)}}
        />
        <button onClick={handleAdd}>추가</button>
      </div>
      <div>
        <p>Working</p>
        <div className="w-full flex gap-4">
          {working.map((todo) => (
            <Card todo={todo} setTodos={setTodos} key={todo.id} />
          ))}
        </div>
      </div>
      <div>
        <p>Done</p>
        <div className="w-full flex gap-4">
          {done.map((todo) => (
            <Card todo={todo} setTodos={setTodos} key={todo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
