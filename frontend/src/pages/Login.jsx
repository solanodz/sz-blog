/* eslint-disable no-unused-vars */
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { UserContext } from '@/components/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
            toast.success('Inicio de sesión exitoso.');
            setTimeout(refreshPage, 100); // Refresh the page after 1 second
        } else {
            toast.error('Credenciales incorrectas')
        }
    }

    function refreshPage() {
        window.location.reload();
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <MaxWidthWrapper>
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <Input type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <Input type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <Button>Ingresar</Button>
            </form>
        </MaxWidthWrapper>
    )
}

export default Login
