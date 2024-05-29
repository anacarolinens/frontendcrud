import api from '../api';
import { useEffect, useState } from 'react';
 

const UserList = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        }
        catch (error) {
            console.error('Erro ao obter usuários:', error);
        }
    };   
    
    // Serve para executar uma função quando o componente é montado
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const handleDelete = async (id) => {
        // Chamar a api enviando o id do usuário usando o método delete
        try {
            console.log(id)
            await api.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        }
        catch (error) {
            console.error('Erro ao excluir o usuário:', error);
        }
    };

    return (
        <div>
            <h2>Lista de usuários</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email} 
                        <button onClick={() => handleDelete(user.id)}>
                            Excluir
                        </button>
                    </li>

                ))}

            </ul>
        </div>
    );
    };

export default UserList;