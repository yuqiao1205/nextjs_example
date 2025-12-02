import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import blogPosts from "@/data/blogPosts";

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
    <div className={styles.container}>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className={styles.postImage}
      />
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.meta}>By {post.author} on {post.date}</p>
      <p className={styles.content}>{post.content}</p>
      <Link href="/" className={styles.backLink}>Back to Home</Link>
    </div>
  );
}