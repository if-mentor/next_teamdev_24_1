import Link from "next/link";
import styles from "./styles.module.css";
import { PaginationProps } from "./type";

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/?page=${page}`}
          className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
