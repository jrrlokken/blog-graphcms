import React from 'react';
import DummyJPEG from '../assets/dummy.jpeg';

const PostPreview = ({ post, noImage }) => {
  console.log(noImage);
  return (
    <div className='post-preview'>
      {
        (() => {
          if (noImage !== true) {
            return (
              <div className='cover-image-wrapper'>
                <img className='cover-image' src={ post.coverImage !== null ? post.coverImage.url : DummyJPEG } />
              </div>
            )
          } else {
            return null;
          }
        })()
      }
      <span className="read-more-btn">Read</span>
      <div>
        <h5 className='title'>{post.title}</h5>
        <div className='text-center'>
          <span className='tag'>Author</span> <span className='author'>{ Array.isArray(post.author) ? post.author.join(', ') : post.author }</span>
        </div>
      </div>
      <div className='body'>
        { post.body }
      </div>
    </div>
  );
}

export default PostPreview;