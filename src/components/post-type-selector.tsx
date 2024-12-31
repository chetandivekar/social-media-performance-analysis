"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function PostTypeSelector() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-data`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_type: "reels",
          }),
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log("the data is", data);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800">
        {data.totalData.likes}
      </h1>
      <p className="text-lg text-gray-600 mt-2">{data.totalData.shares}</p>
      <strong className="text-xl text-green-500 mr-2">
        {data.totalData.comments}
      </strong>
      <strong className="text-xl text-blue-500">
        {data.totalData.totalEngagement}
      </strong>
    </div>
  );
}
