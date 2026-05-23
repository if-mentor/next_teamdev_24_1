import { createClient } from "@/libs/supabase/server";
import { PostCard } from "@/components/PostCard";
import { SearchForm } from "@/components/SearchForm";
import { Pagination } from "@/components/Pagination";
import styles from "./styles.module.css";
import { searchAction } from "./actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 8;

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const pageNumber = Number(page);
  const isValidPage = Number.isInteger(pageNumber) && pageNumber >= 1;

  if (page !== undefined && !isValidPage) {
    redirect("/");
  }

  const currentPage = isValidPage ? pageNumber : 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE - 1;

  const supabase = await createClient();

  const { data: posts, count } = await supabase
    .from("posts")
    .select("*, users(name), categories(name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  if (currentPage > Math.max(totalPages, 1)) {
    redirect("/");
  }

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
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </>
  );
}
