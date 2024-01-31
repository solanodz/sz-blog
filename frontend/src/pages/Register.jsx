import { UserContext } from '@/components/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setRedirect(true);
                setUserInfo(userInfo);

            });
        } else {
            alert('wrong credentials');
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <form onSubmit={login} className='max-w-lg mx-auto mt-20 text-center grid grid-flow-row gap-4'>
            <h2 className='font-semibold text-3xl'>Register</h2>
            <Input type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <Input type="email"
                placeholder="email"
                value={email}
                onChange={ev => setEmail(ev.target.value)} />
            <Input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <Button>Ingresar</Button>
            <Separator className='border my-2' />
            <p className='text-muted-foreground text-sm'>Already have an account? <Link to={'/login'} className='text-black underline'>Click here</Link></p>

        </form>
    )
}

export default Register
