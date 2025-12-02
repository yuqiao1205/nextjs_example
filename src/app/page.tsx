'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import blogPosts from "@/data/blogPosts";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Blog</h1>
      </header>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <ul className={styles.blogList}>
        {filteredPosts.map((post) => (
          <li key={post.id} className={styles.blogItem}>
            <Link href={`/blog/${post.id}`} className={styles.blogLink}>
              <Image
                src={post.image}
                alt={post.title}
                width={350}
                height={200}
                className={styles.blogImage}
              />
              <div className={styles.blogContent}>
                <h2 className={styles.blogTitle}>{post.title}</h2>
                <p className={styles.blogMeta}>{post.date} by {post.author}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {filteredPosts.length === 0 && searchTerm && (
        <p className={styles.noResults}>No blogs found matching &ldquo;{searchTerm}&rdquo;</p>
      )}
    </div>
  );
}
