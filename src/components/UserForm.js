import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "sonner";

const UserForm = ({fetchUsers, userToEdit, setUserToEdit, addUser}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        }
    }, [userToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (userToEdit) {
                await api.put(`/users/${userToEdit.id}`, {
                    name: name,
                    email: email
                });
                setUserToEdit(null);
                toast.success('Usuário atualizado com sucesso', { position: 'top-right' });
            } else { //only new users
                const response = await api.post('/users', {
                    name: name,
                    email: email
                });
                toast.success('Usuário salvo com sucesso', { position: 'top-right' });
                //Como a API não salva o usuário, adicionamos o novo usuário a lista
                addUser(response.data);
            }



            //fetchUsers();
            setName('');
            setEmail('');
        }
        catch (error) {
            console.error('Erro ao salvar usuário:', error);
            toast.error('Erro ao salvar usuário', { position: 'top-right' });
        }
    
        
    };
    
    return (
        <form 
            onSubmit={handleSubmit}
            className="mt-10"
        >
            <input 
                type="text" 
                id="name"
                placeholder="Digite o nome do usuário"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mx-5 appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 text-sm leading-tight focus:outline-none focus:border-blue-500 w-80 h-11"
            />
            <input 
                type="text"
                id="email" 
                placeholder="Digite o email do usuário"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mx-5 appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 text-sm leading-tight focus:outline-none focus:border-blue-500 w-80 h-11"
            />
            <button 
                type="submit"
                className="mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            
            >
                Salvar
            </button>
        
        </form>
    );
};

export default UserForm;