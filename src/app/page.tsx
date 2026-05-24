import { createClient } from "@/libs/supabase/server";
import { PostCard } from "@/components/PostCard";
import { SearchForm } from "@/components/SearchForm";
import { Pagination } from "@/components/Pagination";
import styles from "./styles.module.css";
import { searchAction } from "./actions";
import { getValidPageNumber } from "@/utils/getValidPageNumber";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 8;

const SUPABASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;

type HomeProps = {
  searchParams: Promise<{ page?: string; keyword?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { keyword, page } = await searchParams;

  const parsedPage = getValidPageNumber(page);
  if (parsedPage === null) redirect("/");
  const currentPage = parsedPage;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE - 1;
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*, users(name), categories(name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);
  if (keyword) {
    query = query.ilike("title", `%${keyword}%`);
  }

  const { data: posts, count } = await query;
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
                thumbnailUrl={
                  post.image_path
                    ? post.image_path.startsWith("http")
                      ? post.image_path
                      : `${SUPABASE_STORAGE_URL}${post.image_path}`
                    : "/sample1.jpg"
                }
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
