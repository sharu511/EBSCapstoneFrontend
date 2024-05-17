import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Adjust import based on your library
import { Table, TableHeader, TableBody, TableRow, TableCell } from './ui/table'; // Adjust import based on your library
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
const Beneficiaries = () => {
    const { accountId } = useParams();

    // Mock data for beneficiaries
    const beneficiaries = [
        { name: 'John Doe', accountNo: '123456789', accountType: 'Savings', ifsc: 'ABCD1234', email: 'john.doe@example.com', status: 'Active' },
        { name: 'Jane Smith', accountNo: '987654321', accountType: 'Checking', ifsc: 'EFGH5678', email: 'jane.smith@example.com', status: 'Inactive' },
        { name: 'Bob Johnson', accountNo: '567890123', accountType: 'Savings', ifsc: 'IJKL9101', email: 'bob.johnson@example.com', status: 'Active' },
    ];

    return (
        <Card className="w-full max-w-7xl mx-auto mt-8 p-4">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Beneficiaries for Account ID: {accountId}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                        <TableRow>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account No</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IFSC Code</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {beneficiaries.map((beneficiary, index) => (
                            <TableRow key={index}>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Avatar  >
                                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beneficiary.name}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.accountNo}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.accountType}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.ifsc}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.email}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={beneficiary.status === 'Active' ? 'success' : 'destructive'}>{beneficiary.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default Beneficiaries;
