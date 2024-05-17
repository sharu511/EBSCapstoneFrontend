import React, { useRef, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast, Toaster } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useNavigate, useParams } from 'react-router-dom';
import { generateRandomId } from '../lib/randomIdGenerator';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie"

const FundTransfer = () => {
    const { accountNumber } = useParams();
    const navigate = useNavigate();
    const beneficiaries = useSelector((state) => state.beneficiaries);
    const accounts = useSelector(state => state.account)
    console.log(accounts);
    const user = Cookies.get("userToken")
    console.log(beneficiaries);
    const [loading, setLoading] = useState(false)
    const [fromAccount, setFromAccount] = useState(0);
    const [beneficiary, setBeneficiary] = useState(0);
    const [amount, setAmount] = useState(0);
    const [Type, setType] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('');
    const [desc, setDesc] = useState('');

    const dialogTriggerRef = useRef(null);
    const validateTransaction = async () => {
        setLoading(true);
        try {
            const response = await fetch(` http://54.147.158.222:9191/acttrans/account/validate?accountNumber=${fromAccount}&password=${transactionPassword}`);
            const result = await response.json();
            if (!result.validity) {
                toast.error("Please check your transaction password and try again", 3000);
                dialogTriggerRef.current.click();
            } else {
                toast.success("Password Matched", 3000);
                confirmTransaction();
            }
        } catch (error) {
            setLoading(false);
            console.error('Error validating transaction:', error);
        }
    };


    const confirmTransaction = async () => {
        try {
            const tranId = generateRandomId();
            const tranId1 = generateRandomId();

            const response1 = await fetch(' http://54.147.158.222:9191/acttrans/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionId: tranId,
                    userId: user,
                    description: desc,
                    transactionAmount: amount,
                    fromAccountNum: fromAccount,
                    toAccountNum: beneficiary,
                    transactionType: 'DB',
                    transactionAccountNum: fromAccount,
                }),
            });
            const res1 = await response1.json();
            console.log(res1);
            const getAccount = await fetch(`http://54.147.158.222:9191/acttrans/account/byacctno/${beneficiary}`)
            const resultAccountDeatils = await getAccount.json();

            const response2 = await fetch(' http://54.147.158.222:9191/acttrans/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    transactionId: tranId1,
                    userId: resultAccountDeatils.userId,
                    description: desc,
                    transactionAmount: amount,
                    fromAccountNum: fromAccount,
                    toAccountNum: beneficiary,
                    transactionType: 'CR',
                    transactionAccountNum: beneficiary,
                }),
            });
            const res2 = await response2.json();
            if (response1.status == 200) {
                toast.success("Transaction successfull", 3000)
                dialogTriggerRef.current.click();
                setTimeout(() => {
                    navigate("/dashboard");
                }, 3500);
                setLoading(false);
            } else {
                setLoading(false);
                toast.success("Error confirming transaction", 3000)
            }

        } catch (error) {
            setLoading(false);
            console.error('Error confirming transaction:', error);
        }
    };

    const handleFundTransfer = () => {
        console.log(fromAccount, beneficiary, amount);
        if (fromAccount && beneficiary && amount) {
            // Open the dialog
            dialogTriggerRef.current.click();
        } else {
            toast.warning('Please fill all fields to proceed.', 3000);
        }
    };

    return (
        <>
            <Toaster richColors position="top-center" />
            <div className='mt-2'>
                <Card className="mx-auto max-w-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">Fund Transfer</CardTitle>
                        <CardDescription>
                            Transfer funds with your beneficiaries
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2 ">
                                    <Select onValueChange={(value) => { setFromAccount(value) }}>
                                        <SelectTrigger className=""  >
                                            <SelectValue placeholder="Select Account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {/* <SelectLabel>Select Beneficiary</SelectLabel> */}
                                                {accounts.accounts.map((account) => (
                                                    <SelectItem key={account.id} value={account.accountNumber}>
                                                        {account.accountNumber}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 ">
                                    <Select onValueChange={(value) => { setBeneficiary(value) }}>
                                        <SelectTrigger className=""  >
                                            <SelectValue placeholder="Select Beneficiary" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {/* <SelectLabel>Select Beneficiary</SelectLabel> */}
                                                {beneficiaries.beneficiaries.map((beneficiary) => (
                                                    <SelectItem key={beneficiary.id} value={beneficiary.accountNumber}>
                                                        {beneficiary.beneficiaryName}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="Enter Amount to transfer"
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">

                                    <Label htmlFor="amount">Transfer Type</Label>

                                    <RadioGroup onValueChange={(value) => { setType(value) }}>
                                        <div className='flex gap-3'>
                                            <div className="space-x-2">
                                                <RadioGroupItem value="upi" id="r1" />
                                                <Label htmlFor="r1">UPI</Label>
                                            </div>
                                            <div className="space-x-2">
                                                <RadioGroupItem value="rtgs/neft" id="r2" />
                                                <Label htmlFor="r2">RTGS/NEFT</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </div>

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Description</Label>
                                <textarea name="desc" onChange={(e) => setDesc(e.target.value)}></textarea>

                            </div>

                            <Button type="submit" className="w-full" onClick={handleFundTransfer}>
                                Fund Transfer
                            </Button>

                        </div>

                    </CardContent>
                </Card>
                <Dialog>
                    <DialogTrigger className="hidden" ref={dialogTriggerRef}>Open</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Transaction Password</DialogTitle>
                            <DialogDescription>
                                <div className="p-4 flex flex-col items-center w-full ">
                                    <Input id="password" type="password" placeholder="Enter Transaction Password" required className="w-full" value={transactionPassword} onChange={(e) => setTransactionPassword(e.target.value)} />
                                    <Button type="submit" className=" w-2/4 mt-4" onClick={validateTransaction}>
                                        {loading ? 'loading' : 'Confirm Transaction'}
                                    </Button>
                                </div>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div >
        </>
    )
}

export default FundTransfer