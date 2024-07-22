import PropTypes from 'prop-types';
import { FaHeart, FaComments } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DeleteButton } from '../styles/PostListStyles.styled';

import {
  PostContainer,
  PostHeader,
  ProfilePic,
  InteractionBar,
  IconText,
  PostContent,
  StyledLink,
  ImageContainer,
} from '../styles/PostStyles.styled';
export default function Post({
  post,
  userId,
  deletePost,
  handleLikeClick,
  isAdmin,
}) {
  const isPostAuthor = userId === post.author._id || isAdmin;

  return (
    <PostContainer>
      <PostHeader>
        <StyledLink to={`/profile/${post.author._id}`}>
          <ProfilePic
            src={post.author.profilePicture}
            alt={`${post.author.firstName}'s avatar`}
          />
        </StyledLink>
        <StyledLink to={`/profile/${post.author._id}`}>
          <p>{post.author.firstName}</p>
        </StyledLink>
        {isPostAuthor && (
          <DeleteButton onClick={() => deletePost(post._id)}>
            <MdDelete title="Delete post" />
          </DeleteButton>
        )}
      </PostHeader>
      <StyledLink to={`/post/${post._id}`}>
        <PostContent>
          <p>{post.content}</p>
        </PostContent>
        <ImageContainer>
          {post?.media[0]?.url && (
            <img src={post.media[0].url} alt="Post media" />
          )}
        </ImageContainer>
      </StyledLink>

      <InteractionBar>
        <IconText
          $liked={post.likedByUser}
          $icon="heart"
          onClick={() => handleLikeClick(post._id, post.likedByUser)}
        >
          <FaHeart size={20} title={post.likedByUser ? 'Unlike' : 'Like'} />{' '}
          {post.likesCount}
        </IconText>
        <IconText>
          <StyledLink to={`/post/${post._id}`}>
            <FaComments size={20} /> {post.comments.length}
          </StyledLink>
        </IconText>
      </InteractionBar>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  userId: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};
