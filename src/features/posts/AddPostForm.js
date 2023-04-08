import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const users = useSelector(selectAllUsers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const submitHandler = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save the post', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label>Post Title</label>
        <input
          type="text"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author Name</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">select author</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label>Content</label>
        <textarea
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          className="btn"
          onClick={submitHandler}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
