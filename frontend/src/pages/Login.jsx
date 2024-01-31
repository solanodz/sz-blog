/* eslint-disable no-unused-vars */
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { UserContext } from '@/components/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
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
            <form onSubmit={login} className='max-w-lg mx-auto mt-20 text-center grid grid-flow-row gap-4'>
                <h2 className='font-semibold text-3xl'>Login</h2>
                <Input type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <Input type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <Button>Ingresar</Button>
                <Separator className='border my-2' />
                <p className='text-muted-foreground text-sm'>You don&apos;t have an account? <Link to={'/register'} className='text-black underline'>Click here</Link></p>
            </form>
        </MaxWidthWrapper>
    )
}

export default Login
