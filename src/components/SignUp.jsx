import { Link, Navigate, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Toaster, toast } from 'sonner';
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../redux/features/userSlice";
const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://34.232.166.211:9191/userinfo', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ fname: formData.firstName, lname: formData.lastName, username: formData.userName, password, email, phone }),
            });
            console.log(response);
            if (response.ok) {
                const result = await response.json();
                console.log('Account created:', result);
                toast.success("User Added Successfully", 3000);
                Cookies.set("userToken", result.entity.userid);
                dispatch(setUser(result))
                setTimeout(() => {
                    navigate("/add-account");
                }, 3500);
            } else {
                toast.error("user cannot created", 3000);
                console.error('Failed to create account');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <Card className="mx-auto max-w-xl mt-20">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Sign Up</CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="userName">User Name</Label>
                                <Input
                                    id="userName"
                                    type="text"
                                    placeholder="User Name"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+91 1234567890"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" >
                                {loading ? 'Loading' : "Create Account"}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
export default SignUp;