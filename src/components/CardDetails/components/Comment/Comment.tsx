import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IComment } from '../../../../models';
import { RootState } from '../../../../store';
import { selectAuthor } from '../../../../store/ducks/author';
import { Button } from '../../../../UIcomponents/Button';
import { Input } from '../../../../UIcomponents/Input';
import { Row, SmallText } from '../../style';

type CommentPropsType = {
  commentData: IComment;
  updateComments: (updatedComment: IComment) => void;
  deleteCommentFromComments: (commentId: number) => void;
};

const Comment: React.FC<CommentPropsType> = ({
  commentData,
  updateComments,
  deleteCommentFromComments,
}) => {
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
    updateComments(updatedComment);
  };

  return (
    <Row>
      <SmallText>{authorName}</SmallText>
      <Input value={commentText} onChange={handleCommentText} fullWidth={true} />
      <Row>
        <Button text="удалить" onClick={() => deleteCommentFromComments(commentData.id)} />
        <Button text="сохранить изменения" onClick={saveCommentText} />
      </Row>
    </Row>
  );
};

export default Comment;
