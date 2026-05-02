//詳細画面のダミーデータです。バックエンド実装時に削除予定。

export const dummyArticle = {
  title: "Blog Title",
  author: "Author",
  authorAvatarUrl: "/default_user_icon.png",
  thumbnailUrl: "/sample1.jpg",
  category: "Category",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
  created_at: new Date().toISOString(),
};

export const dummyComments = [
  {
    id: 1,
    userName: "ユーザー名",
    userAvatarUrl: "/default_user_icon.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    userName: "ユーザー名",
    userAvatarUrl: "/default_user_icon.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    created_at: new Date().toISOString(),
  },
];
