import { useState, useEffect, createContext } from "react";
import { auth, db } from "../utils/firebaseConfig";
import { getFirstElementArrayCollection } from "../utils/parser";
import { Spinner } from "react-bootstrap";
export const UserContext = createContext(null); // Se crea el estado global de la aplicación

// Proveedor que indica dónde está disponible el contexto.
// Se le pasa children porque es un componente que encierra a otros (ver App.jsx)
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // Para que cuando el usuario inicie sesión, el estado cambie. setUser cambia el estado.
  const [loading, setLoading] = useState(true);

  // user es el json con los datos del usuario y uid es el ID de autenticación que da Firebase
  const createUser = async (user, uid) => {
    if (user.role === "pacient") {
      await db.collection("users").doc(uid).set(user); // Se guarda en la colección 'users'
      await db.collection("pacients").doc(uid).set(user); // Se guarda en la colección 'pacients'
    } else if (user.role === "pending") {
      await db.collection("pendings").doc(uid).set(user); // Se guarda en la colección 'pendings'
    } else {
      user.role = "pacient";
      await db.collection("users").doc(uid).set(user); // Se guarda en la colección 'users'
      await db.collection("pacients").doc(uid).set(user); // Se guarda en la colección 'pacients'
    }
    setUser(user);
  };

  const getUserPending = async (email) => {
    const pendingReference = db.collection("pendings");
    const snapshot = await pendingReference.where("email", "==", email).get();
    if (!snapshot.size) {
      return null;
    }
    const pendingUser = getFirstElementArrayCollection(snapshot);

    return pendingUser;
  };

  const getNoValidUser = async (email) => {
    const noValidReference = db.collection("novalids");
    const snapshot = await noValidReference.where("email", "==", email).get();
    if (!snapshot.size) {
      return null;
    }
    const noValidUser = getFirstElementArrayCollection(snapshot);

    return noValidUser;
  };

  // función para buscar usuario por nombre ya que twitter y facebook pueden tener usuarios sin correos
  const getUserByName = async (name) => {
    const usersReference = db.collection("users");
    // Se busca en la base de datos un objeto cuyo parámetro email coincida con el ingresado
    const snapshot = await usersReference.where("name", "==", name).get();

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  const getUserByEmail = async (email) => {
    const usersReference = db.collection("users");
    // Se busca en la base de datos un objeto cuyo parámetro email coincida con el ingresado
    const snapshot = await usersReference.where("email", "==", email).get();

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  useEffect(() => {
    // Este useEffect permite que la sesión no se caiga cuando se refresque la página
    // unlisten es un Observer que está pendiente de los cambios de sesión del usuario
    setLoading(true);
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        // Cuando se inicie sesión, se busca el usuario en la base de datos
        const profile = await getUserByEmail(loggedUser.email);
        // Si no tienes un perfil creado en la base de datos, se crea y se coloca en el contexto.
        if (!profile) {
          const pendingProfile = await getUserPending(loggedUser.email);
          if (!pendingProfile) {
            const newProfile = {
              name: loggedUser.displayName,
              email: loggedUser.email,
              uid: loggedUser.uid,
              role: loggedUser.role,
              appointments: [],
            };
            await createUser(newProfile, loggedUser.uid);
            setUser(newProfile);
          } else {
            setUser(null);
          }
        } else {
          setUser(profile);
          console.log("soy usuario", user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Función que se ejecuta cuando el componente se destruye. Se quita el Observer
    return () => {
      unlisten();
    };
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <UserContext.Provider
          //<Spinner animation="border" variant="secondary" />
          value={{
            /* Variables que estarán disponibles globalmente */
            user,
            setUser,
            loading,
            setLoading,
            createUser,
            getUserByName,
            getUserByEmail,
            getUserPending,
            getNoValidUser,
          }}
        >
          {children} {/* Encierra a todos los hijos que están en App.jsx */}
        </UserContext.Provider>
      )}
    </>
  );
}
