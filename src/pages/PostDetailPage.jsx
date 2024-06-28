import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import {
  DetailContainer,
  AuthorInfo,
  ProfilePicture,
  Content,
  Stats,
  NoComments,
} from '../styles/PostDetailPageStyles.styled';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          credentials: 'include',
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (post) {
    return (
      <DetailContainer>
        <AuthorInfo>
          <ProfilePicture
            src={post.author.profilePicture}
            alt={`${post.author.firstName}'s avatar`}
          />
          <p>{post.author.firstName}</p>
        </AuthorInfo>
        <Content>
          <p>{post.content}</p>
        </Content>
        <Stats>
          <p>Likes: {post.likesCount}</p>
          <p>Comments: {post.comments.length}</p>
        </Stats>

        {post.comments.length > 0 ? (
          <Comments postId={postId} />
        ) : (
          <NoComments>No comments yet.</NoComments>
        )}
      </DetailContainer>
    );
  }
}
