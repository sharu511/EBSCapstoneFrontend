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
import Cookies from "js-cookie"

import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Toaster, toast } from "sonner";
import { generateRandomId } from "../lib/randomIdGenerator";
const Beneficiary = () => {
    const [loading, setLoading] = useState(false)
    const user = Cookies.get("userToken");
    const [formData, setFormData] = useState({
        beneficiaryName: '',
        accountNumber: 0,
        accountType: 'saving',
        ifscCode: "",
        emailId: '',
        branchName: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleRadioChange = (value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            accountType: value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const benId = generateRandomId();
        try {
            const response = await fetch('http://72.44.55.218:9191/benefeciary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ beneficiaryId: benId, beneficiaryName: formData.beneficiaryName, accountNumber: formData.accountNumber, accountType: formData.accountType, ifscCode: formData.ifscCode, email: formData.emailId, ofUserId: user, status: false }),
            });

            const addAccount = await fetch('http://54.147.158.222:9191/acttrans/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },

                body: JSON.stringify({ accountNumber: formData.accountNumber, userId: benId, transactionPwd: 'password', branchName: formData.branchName, ifscCode: formData.ifscCode, accountBalance: 10000 }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                setLoading(false);
                toast.success("Beneificary Added Successfully")


            } else {
                setLoading(false);
                toast.error('Failed to submit beneficiary details');
            }
        } catch (error) {
            setLoading(false);
            toast.error("Error while adding ")
        }
    };

    return (
        <div>
            <Toaster richColors position="top-center" />
            <Card className="mx-auto max-w-xl mt-10">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Beneficiary Details
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your Beneficiary Details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
                                <Input
                                    id="beneficiaryName"
                                    type="text"
                                    placeholder="Beneficiary Name"
                                    value={formData.beneficiaryName}
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
                            <div>
                                <Label htmlFor="accountType">Account Type</Label>
                                <RadioGroup
                                    value={formData.accountType}
                                    onValueChange={handleRadioChange}
                                    className="mt-3 mb-2"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="saving" id="r1" />
                                            <Label htmlFor="r1">Saving Account</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="current" id="r2" />
                                            <Label htmlFor="r2">Current Account</Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ifscCode">IFSC Code</Label>
                                <Input
                                    id="ifscCode"
                                    type="text"
                                    placeholder="IFSC Code"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="emailId">Email ID</Label>
                                <Input
                                    id="emailId"
                                    type="email"
                                    placeholder="m@gmail.com"
                                    value={formData.emailId}
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
                            <Button type="submit" className="w-full">
                                {loading ? "loading" : "Add Beneficiary"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
export default Beneficiary;