import { advice } from "@/types/isrtype";

const page = async () => {
  const res = await fetch("https://korean-advice-open-api.vercel.app/api/advice", {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });
  const data: advice = await res.json();

  console.log(data);

  return (
    <div>
      <p>Author : {data.author}</p>
      <p>Author profile : {data.authorProfile}</p>
      <p>Message : {data.message}</p>
    </div>
  );
};

export default page;