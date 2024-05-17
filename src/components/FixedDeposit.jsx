import { useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Toaster, toast } from "sonner";
import { formatINRCurrency } from "../lib/currencyFormatter";
import { useNavigate } from "react-router-dom";
import { generateRandomId } from "../lib/randomIdGenerator";
import Cookies from "js-cookie"
const FixedDeposit = ({ account }) => {
    const navigate = useNavigate();
    const user = Cookies.get("userToken");
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        depositAmount: 0,
        nature: '',
        period: 0,
        accountNumber: 0,
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
        console.log(formData);
        const fid = generateRandomId();
        try {
            const response = await fetch(' http://3.220.63.21:9191/fixeddeposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ depositamt: formData.depositAmount, fdid: fid, natureofdeposit: formData.nature, accno: formData.accountNumber, userId: user }),
            });

            if (response.ok) {
                const result = await response.json();
                setLoading(false);
                toast.success('Fixed deposit created successfully ', 3000);
                setTimeout(() => {
                    navigate("/dashboard")
                }, 3000);
            } else {
                setLoading(false);
                toast.error('Failed to submit fixed deposit details');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Toaster richColors position="top-center" />
            <Card className="mx-auto max-w-xl mt-10">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Fixed Deposit
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {account && (
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Input
                                    id="accountNumber"
                                    type="number"
                                    placeholder="Account Number"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="depositAmount">Deposit Amount</Label>
                                <Input
                                    id="depositAmount"
                                    type="number"
                                    placeholder="Deposit Amount"
                                    value={formData.depositAmount}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="flex justify-between">
                                    <Button variant="outline" size="sm">Show Balance</Button>
                                    <h2>Available Balance : {formatINRCurrency(1223324)}</h2>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nature">Nature</Label>
                                <Input
                                    id="nature"
                                    type="text"
                                    placeholder="Nature"
                                    value={formData.nature}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="period">Deposit Period</Label>
                                <Input
                                    id="period"
                                    type="number"
                                    placeholder="Period"
                                    value={formData.period}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Input
                                    id="accountNumber"
                                    type="number"
                                    placeholder="Account Number"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {loading ? 'loading' : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
export default FixedDeposit;