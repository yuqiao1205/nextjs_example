'use client';

import Link from "next/link";
import { useState } from "react";
import blogPosts from "@/data";

export default function Home() {
  // Search stateå
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>My Blog</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredPosts.map((post) => (
          <li key={post.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
            <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{post.title}</h2>
              <p style={{ margin: 0, color: '#666' }}>{post.date} by {post.author}</p>
            </Link>
          </li>
        ))}
      </ul>
      {filteredPosts.length === 0 && searchTerm && (
        <p style={{ textAlign: 'center', color: '#666' }}>No blogs found matching "{searchTerm}"</p>
      )}
    </div>
  );
}
