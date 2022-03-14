import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { selectAuthor } from '../../../../store/ducks/author';
import { deleteComment, updateCommentList } from '../../../../store/ducks/comment';
import { Button } from '../../../../UIcomponents/Button';
import { Input } from '../../../../UIcomponents/Input';
import { Row, SmallText } from '../../style';
import { CommentPropsType, CommentTextValuesType } from '../../types';

const Comment: React.FC<CommentPropsType> = ({ commentData }) => {
  const dispatch = useDispatch();
  const authorName = useSelector(selectAuthor);

  const handleSubmitComment = (values: CommentTextValuesType) => {
    if (values.commentText) {
      const updatedComment = { ...commentData, text: values.commentText };
      dispatch(updateCommentList({ comment: updatedComment }));
    } else {
      values.commentText = commentData.text;
    }
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: commentData.id }));
  };

  return (
    <Row>
      <SmallText>{authorName}</SmallText>
      <Form
        onSubmit={handleSubmitComment}
        initialValues={{ commentText: commentData.text }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="commentText" component={Input} />
            <Row>
              <Button text="удалить" onClick={handleDeleteComment} />
              <Button text="сохранить изменения" onClick={handleSubmit} />
            </Row>
          </form>
        )}
      />
    </Row>
  );
};

export default Comment;
