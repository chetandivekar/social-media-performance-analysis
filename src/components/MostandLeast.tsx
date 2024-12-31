import Image from "next/image";
import { Spinner } from "./spinner";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MostAndLeastMetrics({ data, isPending, postType }: any) {
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

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-1">
        {/* Most Liked */}
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Most Liked {getPostTypeFormat()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Image
                src={randomImageUrl}
                alt="Random Post"
                width={400}
                height={600}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-lg font-bold">
                Likes: {data.mostLiked.likes}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Comments: {data.mostLiked.comments}</span>
                <span>Shares: {data.mostLiked.shares}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Least Liked */}
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Least Liked {getPostTypeFormat()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Image
                src={randomImageUrl}
                alt="Random Post"
                width={400}
                height={600}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-lg font-bold">
                Likes: {data.leastLiked.likes}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Comments: {data.leastLiked.comments}</span>
                <span>Shares: {data.leastLiked.shares}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Shared */}
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Most Shared {getPostTypeFormat()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Image
                src={randomImageUrl}
                alt="Random Post"
                width={400}
                height={600}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-lg font-bold">
                Shares: {data.mostShared.shares}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Comments: {data.mostShared.comments}</span>
                <span>Likes: {data.mostShared.likes}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Least Shared */}
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Least Shared {getPostTypeFormat()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={randomImageUrl}
                alt="Random Post"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-lg font-bold">
                Shares: {data.leastShared.shares}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Comments: {data.leastShared.comments}</span>
                <span>Likes: {data.leastShared.likes}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Commented */}
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Most Commented {getPostTypeFormat()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={randomImageUrl}
                alt="Random Post"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-lg font-bold">
                Comments: {data.mostCommented.comments}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Likes: {data.mostCommented.likes}</span>
                <span>Shares: {data.mostCommented.shares}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Least Commented */}
        <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Least Commented {getPostTypeFormat()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={randomImageUrl}
                alt="Random Post"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-lg font-bold">
                Comments: {data.leastCommented.comments}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Likes: {data.leastCommented.likes}</span>
                <span>Shares: {data.leastCommented.shares}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
