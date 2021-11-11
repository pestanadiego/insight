import { useEffect, useState } from 'react';
import { db } from '../utils/firebaseConfig';
import PendingList from '../components/PendingList/PendingList';

function AdminPage() {
    const [pendingUsers, setPendingUsers] = useState([]);

    
    const fetchPendingUsers = async () => {
        const response = await db.collection('pendings').get() // Trae la colección de pendings desde Firestore
        setPendingUsers(response.docs.map(doc => doc.data())); // Coloca cada pendingUsers en un array
    }

    useEffect(() => {
      const unlisten = db.collection('pendings').onSnapshot(async () => fetchPendingUsers());
    }, []);
    
    return (
        <PendingList pendingUsers={pendingUsers} />      
    );
  }
  
  export default AdminPage;