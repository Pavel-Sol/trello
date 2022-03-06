import React, { useState } from 'react';
import { IComment } from '../../../models';
import { Button } from '../../../UIcomponents/Button';
import { Input } from '../../../UIcomponents/Input';
import { Row, SmallText } from '../style';

type CommentPropsType = {
  autor: string;
  commentData: IComment;
  updateComments: (updatedComment: IComment) => void;
  deleteCommentFromComments: (commentId: number) => void;
};

const Comment: React.FC<CommentPropsType> = ({
  autor,
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
      <SmallText>{autor}</SmallText>
      <Input value={commentText} onChange={handleCommentText} fullWidth={true} />
      <Row>
        <Button text="удалить" onClick={() => deleteCommentFromComments(commentData.id)} />
        <Button text="сохранить изменения" onClick={saveCommentText} />
      </Row>
    </Row>
  );
};

export default Comment;
