import usePosts from '../hooks/usePosts';
import Post from './Post';
import { ListWrapper } from '../styles/PostListStyles.styled';

export default function PostList() {
  const { posts, loading, error } = usePosts();
  console.log(posts, loading, error);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <ListWrapper>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </ListWrapper>
  );
}
