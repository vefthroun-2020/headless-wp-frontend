import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Posts</h3>

        <ul>
          {posts.map((post) => (
            <li>
              <Link href={`/post/${post.id}`}>
                <a>{post.title.rendered}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const postsRef = await fetch("http://tskoli.local/wp-json/wp/v2/posts");
  const posts = await postsRef.json();

  return {
    props: {
      posts,
    },
  };
}
