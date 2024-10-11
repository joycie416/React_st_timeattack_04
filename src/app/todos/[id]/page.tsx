import { todo } from "@/types/todo";
import axios from "axios";

type params = {
  params: { id: string };
};
const page = async ({ params }: params) => {
  const { data: todo }: { data: todo } = await axios.get(
    `http://localhost:4000/todos/${params.id}`
  );

  console.log(todo);

  return (
    <div className="w-[200px] border">
      <p>{todo?.id.slice(0, 4)}</p>
      <p>{todo?.contents}</p>
    </div>
  );
};

export default page;
