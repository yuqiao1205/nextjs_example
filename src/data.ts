export interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This is the first post on my blog. Welcome everyone! Here I'll share my thoughts on various topics.",
    date: "2023-10-01",
    author: "John Doe"
  },
  {
    id: 2,
    title: "Learning Next.js",
    content: "Next.js is a powerful React framework. In this post, I'll explain why it's great for building web applications.",
    date: "2023-10-05",
    author: "John Doe"
  },
  {
    id: 3,
    title: "The Future of Web Development",
    content: "Web development is evolving rapidly. Let's discuss some trends and what to expect in the coming years.",
    date: "2023-10-10",
    author: "John Doe"
  },
  {
    id: 4,
    title: "Tips for Better Coding",
    content: "Here are some tips to improve your coding skills: practice regularly, read code, and never stop learning.",
    date: "2023-10-15",
    author: "John Doe"
  }
];

export default blogPosts;