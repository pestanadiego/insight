export const getArrayCollection = (snapshot) => {
  const collection = [];
  snapshot.forEach((element) => {
    collection.push({
      id: element.id, // El ID de la base de datos
      ...element.data(), // La data (los tres puntos son para agarrar todos los key:value)
    });
  });
  return collection;
};

// Retorna el primer elemento del array
export const getFirstElementArrayCollection = (snapshot) => {
  const collection = getArrayCollection(snapshot);
  return collection[0];
};