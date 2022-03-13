import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { selectAuthor } from '../../../../store/ducks/author';
import { deleteCommentFromCommentList, updateCommentList } from '../../../../store/ducks/comment';
import { Button } from '../../../../UIcomponents/Button';
import { Input } from '../../../../UIcomponents/Input';
import { Row, SmallText } from '../../style';
import { CommentPropsType, CommentTextValuesType } from '../../types';

const Comment: React.FC<CommentPropsType> = ({ commentData }) => {
  const dispatch = useDispatch();
  const authorName = useSelector(selectAuthor);

  const saveCommentText = (values: CommentTextValuesType) => {
    if (values.commentText) {
      const updatedComment = { ...commentData, text: values.commentText };
      dispatch(updateCommentList({ comment: updatedComment }));
    } else {
      values.commentText = commentData.text;
    }
  };

  const deleteComment = () => {
    dispatch(deleteCommentFromCommentList({ commentId: commentData.id }));
  };

  return (
    <Row>
      <SmallText>{authorName}</SmallText>
      <Form
        onSubmit={saveCommentText}
        initialValues={{ commentText: commentData.text }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="commentText" component={Input} />
            <Row>
              <Button text="удалить" onClick={deleteComment} />
              <Button text="сохранить изменения" onClick={handleSubmit} />
            </Row>
          </form>
        )}
      />
    </Row>
  );
};

export default Comment;
