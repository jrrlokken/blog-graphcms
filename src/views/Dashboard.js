import React, { useState } from 'react';
// import { Query } from 'react-apollo';
import GraphCMSContent from '../services/graphcms';

const DashboardView = props => {
  const [posts, setPosts] = useState([]);
  const [ newPost, setNewPost] = useState([]);
  const Client = new GraphCMSContent();

  // const LoadingPostsJSX = () => (
  //   <div>
  //     Loading...
  //   </div>
  // );
  // const ErrorLoadingPostsJSX = () => (
  //   <div className='mx-auto alert-danger'>
  //     Error
  //   </div>
  // );
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
        <div className="col-3 offset-1">
          <h4 className="text-center text-danger">
              All Posts: {posts.length}
          </h4>
          POSTS WILL GO HERE
        </div>
      </div>
    </div>
  );
}

export default DashboardView;