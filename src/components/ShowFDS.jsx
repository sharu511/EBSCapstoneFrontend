import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { formatINRCurrency } from '../lib/currencyFormatter';


const ShowFDS = () => {
    const fixedDeposits = useSelector(state => state.fds.fds);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-6">Fixed Deposits</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {fixedDeposits.map((fd, index) => (
                    <Card key={index} className="w-full">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardDescription>Fixed Deposit</CardDescription>
                                <Badge variant="outline">Primary</Badge>
                            </div>
                            <CardTitle className="text-xl font-semibold">FD Account Number</CardTitle>
                            <CardTitle className="text-lg">{fd.accountNumber}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <span className="text-lg font-semibold">FD Balance :</span> {formatINRCurrency(fd.depositamt)}
                            </div>
                            <div className="flex">
                                <div className="text-sm font-semibold mb-4">Invested Amount :</div>
                                <div>{formatINRCurrency(fd.depositamt * 0.7)}</div>
                            </div>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ShowFDS;
