import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
// import { selectAllBeneficiaries } from './slices/beneficiariesSlice';

const ShowBeneficiaries = () => {
    const beneficiaries = useSelector(state => state.beneficiaries.beneficiaries);


    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-6">Beneficiaries</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {beneficiaries.map((beneficiary, index) => (
                    <Card key={index} className="w-full">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <CardDescription>Beneficiary</CardDescription>
                                <Badge variant={beneficiary.status ? "success" : "destructive"}>{beneficiary.status ? "Active" : "Inactive"}</Badge>
                            </div>
                            <CardTitle className="text-xl font-semibold">Beneficiary Name</CardTitle>
                            <CardTitle className="text-lg">{beneficiary.beneficiaryName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <span className="text-lg font-semibold">Account Number :</span> {beneficiary.accountNumber}
                            </div>
                            <div className='flex'>
                                <div className="text-sm font-semibold mb-4">IFSC Code :</div>
                                <div>{beneficiary.ifscCode}</div>
                            </div>
                            <div>
                                <span className="text-lg font-semibold">Email :</span> {beneficiary.email}
                            </div>
                            <div>

                            </div>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ShowBeneficiaries;
