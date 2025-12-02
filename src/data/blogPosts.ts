export interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This is the first post on my blog. Welcome everyone! Here I'll share my thoughts on various topics.",
    date: "2024-07-18",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop",
    author: "Jane Smith"
  },
  {
    id: 2,
    title: "Learning Next.js",
    content: "Next.js is a powerful React framework. In this post, I'll explain why it's great for building web applications.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    date: "2024-10-05",
    author: "Alex Johnson"
  },
  {
    id: 3,
    title: "The Future of Web Development",
    content: "Web development is evolving rapidly. Let's discuss some trends and what to expect in the coming years.",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    author: "Sarah Williams"
  },
  {
    id: 4,
    title: "Tips for Better Coding",
    content: "Here are some tips to improve your coding skills: practice regularly, read code, and never stop learning.",
    date: "2025-01-10",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    author: "Michael Brown"
  }
];

export default blogPosts;