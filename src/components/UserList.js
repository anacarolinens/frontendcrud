import api from '../api';
import { useEffect, useState } from 'react';
 

const UserList = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            console.log(users);
            setUsers(response.data);
        }
        catch (error) {
            console.error('Erro ao obter usuários:', error);
        }
    };   
    
    useEffect(() => {
        fetchUsers();
    }, []);
        

    return (
        <div>
            <h2>Lista de usuários</h2>
            <ul>
                <li>Nome</li>
            </ul>
        </div>
    );
    };

export default UserList;