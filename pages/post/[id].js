import Link from "next/link";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <br />
      <br />
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const postsRef = await fetch("http://tskoli.local/wp-json/wp/v2/posts");
  const posts = await postsRef.json();

  const paths = posts.map((post) => ({ params: { id: post.id + "" } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const postRef = await fetch(
    `http://tskoli.local/wp-json/wp/v2/posts/${context.params.id}`
  );
  const post = await postRef.json();

  return {
    props: {
      post,
    },
  };
}
