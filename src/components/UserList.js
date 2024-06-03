import api from '../api';
import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
 
const UserList = () => {

    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    
    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        }
        catch (error) {
            console.error('Erro ao obter usuários:', error);
            toast.error('Erro ao obter usuários');
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
            toast.success('Usuário excluído com sucesso');
        }
        catch (error) {
            console.error('Erro ao excluir o usuário:', error);
            toast.error('Erro ao excluir o usuário');
        }
    };

       
    const handleEdit = (user) => {  
        setUserToEdit(user);
    };

    const handleAddUser = (newUser) => {
        setUsers([...users, newUser]);
    };  

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-5 my-4">Gerenciamento de Usuários</h1>
            <UserForm
                fetchUsers={fetchUsers}
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
                addUser={handleAddUser}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 border border-gray-200 mt-20 mb-20">
                    <thead>
                        <tr className="w-full bg-blue-500 text-white">
                            <th className="px-1 py-2 border-b border-r border-gray-200 text-sm font-medium text-white uppercase tracking-wider text-center">Nome</th>
                            <th className="px-1 py-2 border-b border-r border-gray-200 text-sm font-medium text-white uppercase tracking-wider text-center">Email</th>
                            <th className="px-1 py-3 border-b border-r border-gray-200 text-sm font-medium text-white uppercase tracking-wider text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-2 py-2 whitespace-nowrap border-r">{user.name}</td>
                                <td className="px-2 py-2 whitespace-nowrap border-r">{user.email}</td>
                                <td className="px-2 py-2 whitespace-nowrap border-r flex justify-center text-sm">
                                    <span
                                        title='Editar'
                                        className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                    </span>
                                    <span
                                        title='Excluir'
                                        className="cursor-pointer text-red-500 hover:text-red-700 ml-4"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} size="lg" /> 
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default UserList;