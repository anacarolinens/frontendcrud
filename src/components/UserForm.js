import { useEffect, useState } from "react";
import api from "../api";

const UserForm = ({fetchUsers, userToEdit, setUserToEdit}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        }
    }
    , [userToEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            // chamar um PUT para atualizar o usuário
            if (userToEdit) {
                const user = {
                    name: name,
                    email: email,
                };
                api.put(`/users/${userToEdit.id}`, user);
                setUserToEdit(null);

            } else {
                api.post('/users', user);
            }

            // chamar um POST para criar um novo usuário
            const user = {
                name: name,
                email: email,
            };
            api.post('/users', user);

            fetchUsers();
            setName('');
            setEmail('');
        }
        catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    
        
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="nome" 
                id="nome" 
                placeholder="Nome" 
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">
                Enviar
            </button>
        
        </form>
    );
};

export default UserForm;