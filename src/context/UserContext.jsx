import { useState, useEffect, createContext } from 'react';
import { auth, db } from '../utils/firebaseConfig';
import { getFirstElementArrayCollection } from '../utils/parser';

export const UserContext = createContext(null); // Se crea el estado global de la aplicación

// Proveedor que indica dónde está disponible el contexto.
// Se le pasa children porque es un componente que encierra a otros (ver App.jsx)
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // Para que cuando el usuario inicie sesión, el estado cambie. setUser cambia el estado.

  // user es el json con los datos del usuario y uid es el ID de autenticación que da Firebase
  const createUser = async (user, uid) => {
    await db.collection('users').doc(uid).set(user); // Se guarda en la colección 'users'
  };

  const getUserByEmail = async (email) => {
    const usersReference = db.collection('users');
    // Se busca en la base de datos un objeto cuyo parámetro email coincida con el ingresado
    const snapshot = await usersReference.where('email', '==', email).get(); 

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  useEffect(() => {
    // Este useEffect permite que la sesión no se caiga cuando se refresque la página
    // unlisten es un Observer que está pendiente de los cambios de sesión del usuario
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        // Cuando se inicie sesión, se busca el usuario en la base de datos
        const profile = await getUserByEmail(loggedUser.email);
        // Si no tienes un perfil creado en la base de datos, se crea y se coloca en el contexto.
        if (!profile) {
          const newProfile = {
            name: loggedUser.displayName,
            email: loggedUser.email,
            role: 'paciente',
          };
          await createUser(newProfile, loggedUser.uid);
          setUser(newProfile);
        } else {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
    });

    // Función que se ejecuta cuando el componente se destruye. Se quita el Observer
    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        /* Variables que estarán disponibles globalmente */
        user,
        setUser,
        createUser,
        getUserByEmail,
      }}
    >
      {children} {/* Encierra a todos los hijos que están en App.jsx */}
    </UserContext.Provider>
  );
}
