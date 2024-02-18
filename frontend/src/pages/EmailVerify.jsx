import { buttonVariants } from '@/components/ui/button';
import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/';

const EmailVerify = () => {

    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${URL}sessions/${params.id}/verify/${params.token}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (response.ok) {
                    setValidUrl(true);
                }
            } catch (error) {
                setValidUrl(false);
            }
        }
        verifyEmail();

    }, [])

    return (
        <div>
            <h1>EmailVerify</h1>
            <Fragment>
                {
                    validUrl ?
                        <div>
                            <h1>Email verified ✅</h1>
                            <Link to='/login' className={buttonVariants({ variant: 'default' })}>Login</Link>

                        </div>
                        :
                        <h1>404 not found</h1>
                }
            </Fragment>
        </div>
    )
}

export default EmailVerify
