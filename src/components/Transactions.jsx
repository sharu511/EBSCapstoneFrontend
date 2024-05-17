import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, MoveDownLeft, MoveUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { formatINRCurrency } from '../lib/currencyFormatter';




const Transactions = () => {
    const { accountNumber } = useParams();
    const transactions = useSelector((state) => state.transactions.transactions)
    console.log(transactions);
    return (
        <div className=''>
            {accountNumber}
            <div className="flex w-full p-3 ">
                <Card
                    className="xl:col-span-2 w-full" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="grid gap-2">

                            <CardTitle className=' text-4xl font-semibold '>Transactions</CardTitle>
                            <CardDescription>
                                Recent transactions from your Account.
                            </CardDescription>
                        </div>
                        <div>
                            <Button type="primary" >Download Statement</Button>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Transaction Id</TableHead>
                                    <TableHead>Date-Time</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>From Account</TableHead>
                                    <TableHead>To Account</TableHead>
                                    <TableHead>Credit/Debit</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions?.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                                <AvatarFallback>{transaction.userId}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{transaction.transactionId}</TableCell>
                                        <TableCell>{transaction.dateTime}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                        <TableCell>{transaction.fromAccountNum}</TableCell>
                                        <TableCell>{transaction.toAccountNum}</TableCell>
                                        <TableCell className={`pl-10 text-center ${transaction.type === 'CR' ? 'text-green-500' : 'text-red-500'}`}>
                                            {transaction.type === 'CR' ? <MoveDownLeft /> : <MoveUpRight />}
                                        </TableCell>
                                        <TableCell>{formatINRCurrency(transaction.transactionAmount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default Transactions