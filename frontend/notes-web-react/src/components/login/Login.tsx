import { useState } from 'react'
import './Login.css'
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router';

export function Login() {
    const [username, setUsername] = useState('');
    const [psswd, setPsswd] = useState('');
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await login(username, psswd);
        if(result) {
            navigate('/notes');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.id === 'lg-username') {
            setUsername(e.target.value)
        } else if(e.target.id === 'lg-psswd') {
            setPsswd(e.target.value)
        }
    }

    return (
        <form className='lg-form' onSubmit={handleLogin}>
            <div className='lg-form-inputs'>
                {error && <div className='errorMessage'>{ error }</div>}
                <div>
                    <label htmlFor='lg-username'>Usuario</label>
                    <input className='lg-form-username' type="text" id="lg-username"  
                        onChange={handleChange} value={username} placeholder='example@example.com' />
                </div>
                <div>
                    <label htmlFor='lg-psswd'>Contraseña</label>
                    <input className='lg-form-psswd' type="password" id='lg-psswd' 
                        onChange={handleChange} value={psswd} placeholder='*********' />
                </div>
                <button className='lg-form-btn' disabled={isLoading}>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</button>
            </div>
        </form>
    )
}