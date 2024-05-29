import api from '../api';
import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import { toast } from 'sonner';
 
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
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-5">CRUD de usuários</h1>
            <UserForm
                fetchUsers={fetchUsers}
                userToEdit={userToEdit}
                setUserToEdit={setUserToEdit}
                addUser={handleAddUser}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 mt-20 mb-20">
                    <thead>
                        <tr className="bg-blue-700">
                            <th className="px-2 py-2 border-b border-gray-200 text-left text-sm font-medium text-white uppercase tracking-wider text-center">Nome</th>
                            <th className="px-2 py-2 border-b border-gray-200 text-left text-sm font-medium text-white uppercase tracking-wider text-center">Email</th>
                            <th className="px-2 py-3 border-b border-gray-200 text-left text-sm font-medium text-white uppercase tracking-wider text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-2 py-2 whitespace-nowrap">{user.name}</td>
                                <td className="px-2 py-2 whitespace-nowrap">{user.email}</td>
                                <td className="px-2 py-2 whitespace-nowrap flex justify-center text-sm">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Excluir
                                    </button>
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