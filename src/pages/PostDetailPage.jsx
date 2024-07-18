import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import LoadingSpinner from '../components/Spinner';
import {
  DetailContainer,
  AuthorInfo,
  ProfilePicture,
  Content,
  Stats,
} from '../styles/PostDetailPageStyles.styled';
import CreateComment from '../components/CreateComment';
import { StyledLink } from '../styles/Comments.styled';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('POST DETAIL:', post);
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
        if (data && data.post && Array.isArray(data.comments)) {
          setPost(data.post);
          setComments(data.comments);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const addCommentToPost = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const deleteCommentFromPost = (commentId) => {
    const newComments = comments.filter((comment) => comment._id !== commentId);
    setComments(newComments);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (post) {
    return (
      <DetailContainer>
        <StyledLink to={`/profile/${post.author._id}`}>
          <AuthorInfo>
            <ProfilePicture
              src={post.author.profilePicture}
              alt={`${post.author.firstName}'s avatar`}
            />
            <p>{post.author.firstName}</p>
          </AuthorInfo>
        </StyledLink>
        <Content>
          <p>{post.content}</p>
        </Content>
        <Stats>
          <p>Likes: {post.likesCount}</p>
          <p>Comments: {comments.length}</p>
        </Stats>
        <Comments
          comments={comments}
          postId={postId}
          deleteComment={deleteCommentFromPost}
        />
        <CreateComment postId={postId} addComment={addCommentToPost} />
      </DetailContainer>
    );
  }
}
