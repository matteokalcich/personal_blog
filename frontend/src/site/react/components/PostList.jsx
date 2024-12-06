import React from 'react';
import Post from './Post';
import '../../styles/index.css';

function PostList({ posts, chiamanteP }) {

  console.log('Post ricevuti:', posts); // Aggiungi un log per controllare cosa riceve il componente

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (

          <Post
            key={post.idPost}
            id={post.idPost}
            titolo={post.titoloPost}
            dataCreazione={post.dataCreazione}
            imgSrc={`http://localhost:3000/${post.pathFotoPost}`}
            descrizione={post.descrizionePost}
            chiamante={chiamanteP}
          />
        ))
      ) : (
        <p style={{ color: 'red' }}>Nessun post disponibile</p>
      )}
    </>
  );
}

export default PostList;
