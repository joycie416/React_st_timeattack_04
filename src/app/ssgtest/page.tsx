import { jsonPlaceHolder } from "@/types/ssgtype";

const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/10", {
    method: "GET",
  });
  const data: jsonPlaceHolder = await res.json();

  console.log(data);

  return (
    <div>
      <p>Title : {data.title}</p>
      <p>Body : {data.body}</p>
    </div>
  );
};

export default page;
