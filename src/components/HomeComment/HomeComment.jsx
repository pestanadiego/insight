function HomeComment({ name, comment, starts }) {
  return (
    <>
      <div>
        <p>nombre: {name}</p>
        <p>comentario: {comment}</p>
        <p>estrellas: {starts}</p>
      </div>
    </>
  );
}

export default HomeComment;
