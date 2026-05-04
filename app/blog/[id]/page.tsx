import { notFound } from "next/navigation";
import { blogPosts } from "@/app/data/carDate";
import ArticleDetail from "@/app/components/theme1/ArticleDetail";

interface BlogPostPageProps {
  params: { id: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === parseInt(id));
  
  if (!post) {
    notFound();
  }

  return <ArticleDetail post={post} />;
}
