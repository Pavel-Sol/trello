import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IComment } from '../../../../models';
import { selectAuthor } from '../../../../store/ducks/author';
import { deleteCommentFromCommentList, updateCommentList } from '../../../../store/ducks/comment';
import { Button } from '../../../../UIcomponents/Button';
import { Input } from '../../../../UIcomponents/Input';
import { Row, SmallText } from '../../style';

type CommentPropsType = {
  commentData: IComment;
};

const Comment: React.FC<CommentPropsType> = ({ commentData }) => {
  const dispatch = useDispatch();
  const authorName = useSelector(selectAuthor);
  const [commentText, setCommentText] = useState(commentData.text);
  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const saveCommentText = () => {
    if (!commentText) {
      setCommentText(commentData.text);
      return;
    }
    const updatedComment = { ...commentData, text: commentText };
    dispatch(updateCommentList({ comment: updatedComment }));
  };

  const deleteComment = () => {
    dispatch(deleteCommentFromCommentList({ commentId: commentData.id }));
  };

  return (
    <Row>
      <SmallText>{authorName}</SmallText>
      <Input value={commentText} onChange={handleCommentText} fullWidth={true} />
      <Row>
        <Button text="удалить" onClick={deleteComment} />
        <Button text="сохранить изменения" onClick={saveCommentText} />
      </Row>
    </Row>
  );
};

export default Comment;
