import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div className="postDB">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.idPost}
            titolo={post.titoloPost}
            dataCreazione={post.dataCreazione}
            imgSrc={post.pathFotoPost}
            descrizione={post.descrizionPost}
          />
        ))
      ) : (
        <p style={{ color: 'red' }}>Nessun post disponibile</p>
      )}
    </div>
  );
}

export default PostList;
