import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db-connection";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!["reels", "static_image", "carousel"].includes(data.post_type)) {
      return NextResponse.json(
        {
          error:
            "Invalid post_type, it should be reels, static_image, or carousel",
        },
        {
          status: 400,
        }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection("engagement_data");

    // Fetch all documents of the specified post_type
    const result = await collection
      .find({ post_type: data.post_type })
      .toArray();

    if (!result.length) {
      return NextResponse.json(
        { error: "No data found for the given post_type" },
        { status: 404 }
      );
    }

    // Calculate averages

    let totalLikes = 0;
    let totalShares = 0;
    let totalComments = 0;
    let totalEngagements = 0;

    result.forEach((post) => {
      const postEngagement = post.likes + post.shares + post.comments;
      totalLikes += post.likes;
      totalShares += post.shares;
      totalComments += post.comments;
      totalEngagements += postEngagement;

      post.totalEngagement = postEngagement; // Add this field to each post
    });

    const totalData = {
      likes: totalLikes,
      shares: totalShares,
      comments: totalComments,
      totalEngagement: totalEngagements,
    };

    const averageData = {
      likes: Math.round(totalLikes / result.length),
      shares: Math.round(totalShares / result.length),
      comments: Math.round(totalComments / result.length),
      totalEngagement: Math.round(totalEngagements / result.length),
    };

    // Find most and least engaged posts
    const mostLiked = result.reduce((max, curr) =>
      curr.likes > max.likes ? curr : max
    );
    const leastLiked = result.reduce((min, curr) =>
      curr.likes < min.likes ? curr : min
    );

    const mostShared = result.reduce((max, curr) =>
      curr.shares > max.shares ? curr : max
    );
    const leastShared = result.reduce((min, curr) =>
      curr.shares < min.shares ? curr : min
    );

    const mostCommented = result.reduce((max, curr) =>
      curr.comments > max.comments ? curr : max
    );
    const leastCommented = result.reduce((min, curr) =>
      curr.comments < min.comments ? curr : min
    );

    return NextResponse.json(
      {
        message: `Results calculated successfully for ${data.post_type}`,
        dataLength: result.length,
        totalData,
        averageData,
        mostLiked,
        leastLiked,
        mostShared,
        leastShared,
        mostCommented,
        leastCommented,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to calculate results" },
      { status: 500 }
    );
  }
}
