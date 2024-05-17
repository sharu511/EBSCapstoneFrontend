import { useState } from "react";
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
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { addAccount } from "../redux/features/accountSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const AddAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const user = Cookies.get("userToken");
    const [formData, setFormData] = useState({
        accountNumber: 0,
        Tpassword: '',
        branchName: '',
        IFSCcode: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await fetch('http://54.147.158.222:9191/acttrans/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },

                body: JSON.stringify({ accountNumber: formData.accountNumber, userId: user, transactionPwd: formData.Tpassword, branchName: formData.branchName, ifscCode: formData.IFSCcode, accountBalance: 10000 }),
            });

            if (response.ok) {
                const result = await response.json();
                setLoading(false);
                console.log(result);
                toast.success("Account added successfully", 2500)
                dispatch(addAccount(result.entity))
                setTimeout(() => {
                    navigate("/dashboard")
                }, 3000);
            } else {
                setLoading(false);
                toast.error('Failed to create account');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error while creating account');
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <Card className="mx-auto max-w-xl mt-10">
                <CardHeader>
                    <CardTitle className="text-xl text-center">Add Account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to Create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Input
                                    id="accountNumber"
                                    type="text"
                                    placeholder="Account number"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="Tpassword">Transaction Password</Label>
                                <Input
                                    id="Tpassword"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.Tpassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="branchName">Branch Name</Label>
                                <Input
                                    id="branchName"
                                    type="text"
                                    placeholder="Branch Name"
                                    value={formData.branchName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="IFSCcode">IFSC Code</Label>
                                <Input
                                    id="IFSCcode"
                                    type="text"
                                    placeholder="IFSC Code"
                                    value={formData.IFSCcode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {loading ? "Loading" : "Create an account"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
export default AddAccount;