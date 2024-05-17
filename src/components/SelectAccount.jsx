import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SelectAccount = () => {

    const accounts = useSelector((state) => state.account.accounts);
    console.log(accounts);


    const navigate = useNavigate();
    const handleAccountClick = (accountId) => {
        navigate(`/account/${accountId}`);
    };


    return (
        <div className="p-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <List className="h-5 w-5" />
                        Select Account
                    </CardTitle>
                </CardHeader>
                <CardContent>

                    <ul className="space-y-2">
                        {accounts.length > 0 ? (
                            accounts.map((account) => (
                                <li
                                    key={account.id}
                                    className="p-2 border rounded flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleAccountClick(account.accountNumber)}
                                >
                                    <div>

                                        <p className="text-lg">Account Number: <span className='font-semibold'>{account.accountNumber}</span></p>

                                    </div>

                                </li>
                            ))
                        ) : (
                            <p>No accounts found.</p>
                        )}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default SelectAccount;
