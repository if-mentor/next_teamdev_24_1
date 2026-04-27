"use client";

import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { SearchForm } from "@/components/SearchForm";
import styles from "./styles.module.css";

const dummyPosts = [
  {
    id: 1,
    title: "1つ目の投稿",
    author: "山田 太郎",
    category: "Category",
    thumbnailUrl: "/sample1.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "2つ目の投稿",
    author: "鈴木 花子",
    category: "Category",
    thumbnailUrl: "/sample2.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "3つ目の投稿",
    author: "高橋 健太",
    category: "Category",
    thumbnailUrl: "/sample3.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "4つ目の投稿",
    author: "田中 美咲",
    category: "Category",
    thumbnailUrl: "/sample4.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "5つ目の投稿",
    author: "伊藤 翔太",
    category: "Category",
    thumbnailUrl: "/sample5.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 6,
    title: "6つ目の投稿",
    author: "渡辺 彩",
    category: "Category",
    thumbnailUrl: "/sample1.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 7,
    title: "7つ目の投稿",
    author: "山本 大輔",
    category: "Category",
    thumbnailUrl: "/sample2.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
  {
    id: 8,
    title: "8つ目の投稿",
    author: "中村 光",
    category: "Category",
    thumbnailUrl: "/sample3.jpg",
    content: "てすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすとてすと",
    createdAt: new Date(),
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.searchWrapper}>
          <SearchForm onSearch={(value) => console.log(value)} />
        </div>
        <div className={styles.cardGrid}>
          {dummyPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              author={post.author}
              category={post.category}
              thumbnailUrl={post.thumbnailUrl}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      </main>
    </>
  );
}
