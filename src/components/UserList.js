import api from '../api';
import { useEffect, useState } from 'react';
import UserForm from './UserForm';
 
const UserList = () => {

    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    
    // Read all users from the API
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
    
    // Delete a user from the API
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

       
    const handleEdit = (user) => {  
        setUserToEdit(user);
    }

    return (
        <div>
            <h2>Lista de usuários</h2>
            <UserForm fetchUsers={fetchUsers} />
            <UserForm fetchUsers={fetchUsers} userToEdit={userToEdit} setUserToEdit={setUserToEdit}/>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleEdit(user)}>Editar</button>
                        <button onClick={() => handleDelete(user.id)}>Excluir</button>
                    </li>
                ))}

            </ul>
        </div>
    );
    };

export default UserList;