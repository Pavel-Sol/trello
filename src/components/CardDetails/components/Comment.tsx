import React, { useState } from 'react';
import { IComment } from '../../../models';
import { Button } from '../../../UIcomponents/Button';
import { Input } from '../../../UIcomponents/Input';
import { Row } from '../style';

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
  const [commentText, setCommentText] = useState(commentData.text);
  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const saveCommentText = () => {
    const updatedComment = { ...commentData, text: commentText };
    updateComments(updatedComment);
  };

  return (
    <Row>
      <Input value={commentText} onChange={handleCommentText} />
      <Row>
        <Button text="удалить" onClick={() => deleteCommentFromComments(commentData.id)} />
        <Button text="сохранить изменения" onClick={saveCommentText} />
      </Row>
    </Row>
  );
};

export default Comment;
