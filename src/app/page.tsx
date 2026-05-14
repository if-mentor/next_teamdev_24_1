import { createClient } from "@/libs/supabase/server";
import { PostCard } from "@/components/PostCard";
import { SearchForm } from "@/components/SearchForm";
import styles from "./styles.module.css";
import { searchAction } from "./actions";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(name), categories(name)")
    .order("created_at", { ascending: false });

  return (
    <>
      <main className={styles.main}>
        <div className={styles.searchWrapper}>
          <SearchForm searchAction={searchAction} />
        </div>
        <div className={styles.cardGrid}>
          {posts?.map((post) => (
            <Link key={post.id} href={`/articles/${post.id}`}>
              <PostCard
                title={post.title}
                author={post.users.name}
                category={post.categories.name}
                thumbnailUrl={post.image_path}
                content={post.content}
                createdAt={post.created_at}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
