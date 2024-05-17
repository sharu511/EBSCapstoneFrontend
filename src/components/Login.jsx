import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!email && password) {
            toast.success("Please Fill Email or Password Fields")
        }
        try {
            const response = await fetch(`http://34.232.166.211:9191/userinfo/validate?email=${email}&password=${password}`,);

            const data = await response.json();

            if (data.validity) {
                setLoading(false);
                const accountResponse = await fetch(`http://34.232.166.211:9191/userinfo/email/${email}`,);
                const accResult = await accountResponse.json();
                console.log(accResult);
                toast.success('Login successful! Redirecting to Dashboard', 3000);
                dispatch(setUser(accResult.entity))
                Cookies.set("userToken", accResult.entity.userid)
                setTimeout(() => {
                    navigate("/dashboard");
                }, 3500);
            }
            else {
                setLoading(false);
                toast.error('Please check your credentials and try again', 3000);

            }
        } catch (error) {
            setLoading(false);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="max-w-xl md:w-2/6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl mb-4 text-center ">
                                Login
                            </CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <form onSubmit={handleLogin} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="yourname@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        className="focus:outline-none focus:ring focus:ring-blue-800"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <CardFooter>
                                    <Button type="submit" className={`w-full `}>
                                        {loading ? 'Loading' : "Log in"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
