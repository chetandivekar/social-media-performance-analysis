import Image from "next/image";
import { Spinner } from "./spinner";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { FaRegHeart, FaRegCommentAlt, FaShareAlt } from "react-icons/fa";

interface MetricData {
  likes: number;
  comments: number;
  shares: number;
}

interface MostAndLeastMetricsProps {
  data: {
    mostLiked: MetricData;
    leastLiked: MetricData;
    mostShared: MetricData;
    leastShared: MetricData;
    mostCommented: MetricData;
    leastCommented: MetricData;
  };
  isPending: boolean;
  postType: string;
}

export function MostAndLeastMetrics({
  data,
  isPending,
  postType,
}: MostAndLeastMetricsProps) {
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[25rem]">
        <Spinner />
      </div>
    );
  }

  const getPostTypeFormat = () => {
    if (postType === "reels") return "Reels";
    if (postType === "static_image") return "Images";
    return "Carousel";
  };

  const randomImageUrl = "https://picsum.photos/800/600";

  const MetricCard = ({
    title,
    data,
    isPositive,
  }: {
    title: string;
    data: MetricData;
    isPositive: boolean;
  }) => (
    <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={`text-sm font-medium ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Image
            src={randomImageUrl}
            alt="Random Post"
            width={720}
            height={1080}
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FaRegHeart className="text-purple-400" /> {data.likes}
            </span>
            <span className="flex items-center gap-1">
              <FaRegCommentAlt className="text-purple-400" /> {data.comments}
            </span>
            <span className="flex items-center gap-1">
              <FaShareAlt className="text-purple-400" /> {data.shares}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
        <MetricCard
          title={`Most Liked ${getPostTypeFormat()}`}
          data={data.mostLiked}
          isPositive={true}
        />
        <MetricCard
          title={`Least Liked ${getPostTypeFormat()}`}
          data={data.leastLiked}
          isPositive={false}
        />
        <MetricCard
          title={`Most Shared ${getPostTypeFormat()}`}
          data={data.mostShared}
          isPositive={true}
        />
        <MetricCard
          title={`Least Shared ${getPostTypeFormat()}`}
          data={data.leastShared}
          isPositive={false}
        />
        <MetricCard
          title={`Most Commented ${getPostTypeFormat()}`}
          data={data.mostCommented}
          isPositive={true}
        />
        <MetricCard
          title={`Least Commented ${getPostTypeFormat()}`}
          data={data.leastCommented}
          isPositive={false}
        />
      </div>
    </div>
  );
}
