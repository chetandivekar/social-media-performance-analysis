"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Spinner } from "./spinner";
import { CiImageOn } from "react-icons/ci";
import { BsCameraReels } from "react-icons/bs";
import { BiCarousel } from "react-icons/bi";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { MostAndLeastMetrics } from "./MostandLeast";
import { CiShare1 } from "react-icons/ci";

const queryClient = new QueryClient();

export function EngagementMetrics() {
  return (
    <QueryClientProvider client={queryClient}>
      <OverviewMetrics />
    </QueryClientProvider>
  );
}

export function OverviewMetrics() {
  const [postType, setPostType] = useState("reels"); // Default post type

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData", postType], // Include postType in queryKey for caching
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-data`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_type: postType, // Use dynamic post type
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

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-600">
        <p>Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex justify-center border-b">
        {["reels", "static_image", "carousel"].map((type) => (
          <button
            key={type}
            onClick={() => setPostType(type)}
            className={`px-4 py-2 text-md font-medium ${
              postType === type
                ? "border-b-2 border-blue-600 text-blue-600 -py-2"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {type === "reels" ? (
              <div className="flex justify-center items-center gap-2">
                <> Reel</>
                <BsCameraReels className="inline-block h-4 w-4" />{" "}
              </div>
            ) : type === "static_image" ? (
              <div className="flex justify-center items-center gap-2">
                <> Image</>
                <CiImageOn className="inline-block h-5 w-5" />{" "}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <> Carousel</>
                <BiCarousel className="inline-block h-5 w-5" />{" "}
              </div>
            )}
          </button>
        ))}
      </div>
      <div>
        {data && (
          <h1 className="text-3xl font-bold text-gray-800">
            {postType === "reels"
              ? "Reels"
              : postType === "static_image"
              ? "Images"
              : "Carousel"}{" "}
            ({data.dataLength})
          </h1>
        )}
      </div>
      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 justify-center flex items-center gap-2">
              <> Total Likes</>
              <FaRegHeart className="inline-block h-3 w-3" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <div className="text-3xl min-h-[3rem] font-bold">
                  {data.totalData.likes}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.averageData.likes} average likes
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 justify-center flex items-center gap-2">
              <> Total Shares</>
              <CiShare1 className="inline-block h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <div className="text-3xl font-bold">
                  {data.totalData.shares}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.averageData.shares} average shares
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex justify-center items-center gap-2">
              <> Total Comments</>
              <FaRegCommentAlt className="inline-block h-3 w-3" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <div className="text-3xl font-bold">
                  {data.totalData.comments}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.averageData.comments} average comments
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl mb-2 font-bold text-gray-800">
          Most and Least Metrics
        </h2>
        <MostAndLeastMetrics
          data={data}
          isPending={isPending}
          postType={postType}
        />
      </div>
    </div>
  );
}
