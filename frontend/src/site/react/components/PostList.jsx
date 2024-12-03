import React from 'react';
import Post from './Post';

function PostList({ posts, chiamanteP }) {

  console.log('Post ricevuti:', posts); // Aggiungi un log per controllare cosa riceve il componente

  return (
    <div className="postDB">
      {posts.length > 0 ? (
        posts.map((post) => (

          console.log('Id post test: ', post.idPost),
          <Post
            key={post.idPost}
            id={post.idPost}
            titolo={post.titoloPost}
            dataCreazione={post.dataCreazione}
            imgSrc={post.pathFotoPost}
            descrizione={post.descrizionePost}
            chiamante={chiamanteP}
          />
        ))
      ) : (
        <p style={{ color: 'red' }}>Nessun post disponibile</p>
      )}
    </div>
  );
}

export default PostList;
