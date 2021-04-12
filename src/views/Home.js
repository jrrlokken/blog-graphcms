import React, { useState } from 'react';
import { Query } from 'react-apollo';
import PostPreview from '../components/PostPreview';
import TrendingPosts from '../components/Trending';
import GraphCMSContent from '../services/graphcms';

const HomeView = props => {
  const [posts, setPosts] = useState([]);
  const Client = new GraphCMSContent();
  const LoadingPostsJSX = () => <div>Loading...</div>;
  const ErrorLoadingPostsJSX = () => (
    <div className='mx-auto alert-danger'>
      Error
    </div>
  );
  return (
    <>
    <div className='container row mx-auto p-2'>
      <div className='col-8'>
        <h3>Recent Articles</h3>
        <div className='border p-3'>
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
                return POSTS.slice(0,6).map(post => (
                  <PostPreview post={post} />
                ));
              }
            }
          </Query>
        </div>
      </div>
      <div className='col-4 border bg-secondary p-2 sidebar'>
        <TrendingPosts posts={posts} />
      </div>
    </div>
    </>
  );
};

export default HomeView;