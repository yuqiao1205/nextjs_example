import { notFound } from "next/navigation";
import Link from "next/link";
import blogPosts from "@/data";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>{post.title}</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>By {post.author} on {post.date}</p>
      <p style={{ lineHeight: '1.6', color: '#333' }}>{post.content}</p>
      <Link href="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Back to Home</Link>
    </div>
  );
}