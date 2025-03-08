import { BlogPostCard } from "@/components/general/BlogpostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

async function getData(id: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function DasbhoardRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Article</h2>
        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
