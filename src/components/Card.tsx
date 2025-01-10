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
import Link from "next/link";
import { Lightbulb } from "lucide-react";

const queryClient = new QueryClient();

export function EngagementMetrics() {
  return (
    <QueryClientProvider client={queryClient}>
      <OverviewMetrics />
    </QueryClientProvider>
  );
}

export function OverviewMetrics() {
  const [postType, setPostType] = useState("reels");

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData", postType],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-data`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_type: postType,
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
      <div className="flex justify-center items-center text-red-400">
        <p>Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className=" mx-auto ">
        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <div className="md:flex md:items-center md:relative  ">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 absolute left-1/2 transform -translate-x-1/2">
              SocialLens Dasboard
            </h1>
            <Link href="/analysis" className="ml-auto">
              <div className="px-6 flex gap-2 py-3 text-lg font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md transition-all duration-200">
                <button className="">Insights Hub</button>

                <Lightbulb width={22} />
              </div>
            </Link>
          </div>

          <p className="text-gray-400 mt-2">
            Social Media Performance Dashboard
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-gray-800">
          {["reels", "static_image", "carousel"].map((type) => (
            <button
              key={type}
              onClick={() => setPostType(type)}
              className={`px-6 py-3 text-md font-medium transition-all duration-200 ${
                postType === type
                  ? "border-b-2 border-purple-500 text-purple-400 bg-white/5"
                  : "text-gray-400 hover:text-purple-400 hover:bg-white/5"
              }`}
            >
              {type === "reels" ? (
                <div className="flex items-center  gap-2">
                  <span>Reels</span>
                  <BsCameraReels className="h-4 w-4" />
                </div>
              ) : type === "static_image" ? (
                <div className="flex items-center gap-2">
                  <span>Images</span>
                  <CiImageOn className="h-5 w-5" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Carousel</span>
                  <BiCarousel className="h-5 w-5" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Title with Count */}
        <div className="mt-5">
          <h1 className="text-3xl mb-5 font-bold text-gray-200">
            {data ? (
              <>
                {postType === "reels"
                  ? "Reels"
                  : postType === "static_image"
                  ? "Images"
                  : "Carousel"}{" "}
                <span className="text-purple-400">({data.dataLength})</span>
              </>
            ) : (
              <Spinner />
            )}
          </h1>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 mt-5 md:grid-cols-3 sm:grid-cols-1">
          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <span>Total Likes</span>
                <FaRegHeart className="h-3 w-3 text-purple-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <div className="text-3xl min-h-[3rem] font-bold text-white">
                    {data.totalData.likes}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {data.averageData.likes} average likes
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <span>Total Shares</span>
                <CiShare1 className="h-4 w-4 text-purple-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <div className="text-3xl font-bold text-white">
                    {data.totalData.shares}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {data.averageData.shares} average shares
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <span>Total Comments</span>
                <FaRegCommentAlt className="h-3 w-3 text-purple-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <div className="text-3xl font-bold text-white">
                    {data.totalData.comments}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {data.averageData.comments} average comments
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Most and Least Metrics Section */}
        <div className="bg-black/40 mt-5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-2xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Most and Least Metrics
          </h2>
          <MostAndLeastMetrics
            data={data}
            isPending={isPending}
            postType={postType}
          />
        </div>
      </div>
    </div>
  );
}
