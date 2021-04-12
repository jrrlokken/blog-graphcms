import React, { useState } from 'react';
import { Query } from 'react-apollo';
import GraphCMSContent from '../services/graphcms';
import Modal from 'react-bootstrap/Modal';

const DashboardView = props => {
  const [posts, setPosts] = useState([]);
  const [ newPost, setNewPost] = useState([]);
  const Client = new GraphCMSContent();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState('');
  const [replacementPost, setReplacementPost] = useState({
    title: '', author: '', body: ''
  });

  const LoadingPostsJSX = () => (
    <div>
      Loading...
    </div>
  );
  const ErrorLoadingPostsJSX = () => (
    <div className='mx-auto alert-danger'>
      Error
    </div>
  );
  const createPost = async () => {
    console.log(newPost);
    const res = await Client.createPost(newPost);
    console.log(res);
    if (res !== false) {
      alert("New post created successfully");
    } else {
      alert('An error occurred');
    }
  }
  const activateUpdateModal = post_id => {
    setPostToUpdate(post_id);
    setShowUpdateModal(true);
  };
  const handleUpdate = async () => {
    const res = await Client.updatePost(postToUpdate.id, replacementPost);
    if (res !== false) {
      alert(`Successfully updated post: ${postToUpdate.id}`);
    } else {
      alert('An error occurred while attempting to update a post');
    }
  }
  return (
    <div id="dashboard_view">
      <div className="container p-2 mx-auto row">
        <div className="col-8">
          <form onSubmit={ e => { e.preventDefault(); createPost(); } } className="form col-12">
            <div>
              <label className="small col-12">
                Title
                <input onChange={ e => setNewPost({
                    ...newPost,
                    title: e.currentTarget.value
                  }) } className="form-control" required />
              </label>
            </div>
            <div>
              <label className="small col-12">
                Author
                <input onChange={ e => setNewPost({
                    ...newPost,
                    author: e.currentTarget.value
                }) } className="form-control" required />
              </label>
            </div>
            <div>
              <label className="small col-12">
                Content<br />
                <textarea onChange={ e => setNewPost({
                    ...newPost,
                    body: e.currentTarget.value
                }) } className="form-control" cols="90" style={{ height: '160px' }}
                required ></textarea>
              </label>
            </div>  
            <div className="text-center">
              <button type="submit" className="btn btn-success">Create Post</button>
            </div>
          </form>
        </div>
        <Modal show={ showUpdateModal } onHide={ e => setShowUpdateModal(false) }>
          <Modal.Header closeButton>
            Update Post
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={ e => { e.preventDefault(); handleUpdate(); } }>
              <label>
                Title:
                <input onChange={ e => setReplacementPost({ ...replacementPost, title: e.currentTarget.value}) } className="form-control" />
              </label>
              <label>
                Author:
                <input onChange={ e => setReplacementPost({ ...replacementPost, author: e.currentTarget.value}) } className="form-control" />
              </label>
              <label>
                Body:
                <textarea onChange={ e => setReplacementPost({ ...replacementPost, body: e.currentTarget.value}) } className="form-control"></textarea>
              </label>
              <div className='text-center mt-2'>
                <button className='btn btn-danger'>Update</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <div className="col-3 offset-1">
          <h4 className="text-center text-white">
              All Posts: {posts.length}
          </h4>
          <Query query={Client.fetchPosts()}>
            {
              ({ loading, error, data }) => {
                if (loading) return LoadingPostsJSX();
                if (error) {
                  console.log(error);
                  return ErrorLoadingPostsJSX();
                }
                const POSTS = data.posts;
                setPosts(POSTS);
                return posts.map(post => (
                  <div onClick={ e => activateUpdateModal(post.id) } className='pl-2 text-muted border mb-3' style={{ cursor: 'pointer' }}>
                    {post.title}
                  </div>
                ))
              }
            }
          </Query>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;