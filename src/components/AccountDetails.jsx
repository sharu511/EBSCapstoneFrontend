import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link, useParams } from 'react-router-dom';
import { Activity, ArrowUpRight, IndianRupee, PiggyBank, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { selectFDsByAccountNumber } from '../redux/features/fdSlice';
import { selectAccountByNumber } from '../redux/features/accountSlice';
import { selectTransactionsByAccountNumber } from '../redux/features/transactionSlice';
import { formatINRCurrency } from '../lib/currencyFormatter';


const AccountDetails = () => {
  const { accountNumber } = useParams();
  const parsedAccountNumber = parseInt(accountNumber)
  const accounts = useSelector(state => state.account.accounts);
  const account = accounts.filter(account => account.accountNumber === parsedAccountNumber);
  console.log("mapped array ", account);
  // const account = useSelector((state) => selectAccountByNumber(state, parsedAccountNumber));

  const transactions = useSelector((state) => selectTransactionsByAccountNumber(state, parsedAccountNumber));
  const fixedDeposits = useSelector((state) => selectFDsByAccountNumber(state, parsedAccountNumber));
  console.log(account, transactions, fixedDeposits);
  if (!account) {
    return <div>Account not found</div>;
  }
  const transactionData = [
    { name: '1', amount: 120 },
    { name: '2', amount: 150 },
    { name: '3', amount: 90 },
    { name: '4', amount: 200 },
    { name: '5', amount: 240 },
    { name: '6', amount: 170 },
    { name: '7', amount: 130 },
    { name: '8', amount: 160 },
    { name: '9', amount: 190 },
    { name: '10', amount: 220 },
    { name: '11', amount: 110 },
    { name: '12', amount: 140 },
    { name: '13', amount: 180 },
    { name: '14', amount: 210 },
    { name: '15', amount: 250 },
    { name: '16', amount: 230 },
    { name: '17', amount: 260 },
    { name: '18', amount: 270 },
    { name: '19', amount: 300 },
    { name: '20', amount: 280 },
    { name: '21', amount: 290 },
    { name: '22', amount: 310 },
    { name: '23', amount: 320 },
    { name: '24', amount: 330 },
    { name: '25', amount: 340 },
    { name: '26', amount: 350 },
    { name: '27', amount: 360 },
    { name: '28', amount: 370 },
    { name: '29', amount: 380 },
    { name: '30', amount: 390 },
    { name: '31', amount: 400 },
  ];

  const userTransactionData = transactions.map((transaction, index) => ({
    name: index + 1,
    amount: transaction.transactio,
  }));

  return (
    <div className="flex min-h-screen w-full flex-col">
      <h1 className='text-3xl font-semibold ml-10 mt-4'>Account Details of {account[0].accountNumber}</h1>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatINRCurrency(account[0].accountBalance)}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length}</div>
              Average monthly transactions
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fixed Deposits</CardTitle>
              <PiggyBank className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatINRCurrency(12625)} </div>
              <p className="text-xs text-muted-foreground">On an average of 7% P.A</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{3}</div>
              <p className="text-xs text-muted-foreground">0 Pending Beneficiary</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Overview</CardTitle>
                <CardDescription>Recent transactions in this month</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CustomBarGraph data={transactionData} />
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <div className='flex justify-between'>
                <CardTitle>Recent Transactions</CardTitle>
                <Button asChild size="sm" className="gap-1">
                  <Link to="/transactions">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-8">
              {transactions.slice(0, 5).map((transaction, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={transaction.avatarUrl || "/avatars/default.png"} alt="Avatar" />
                    <AvatarFallback>{transaction.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{transaction.transactionId}</p>
                    <p className="text-sm text-muted-foreground">{transaction.dateTime}</p>
                  </div>
                  <div className="ml-auto font-medium">+&#x20B9;{transaction.transactionAmount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <h1 className='ml-5 text-4xl font-semibold'>Fixed Deposits</h1>
          <div className="flex flex-row items-center justify-around w-full mt-4 gap-6">
            {fixedDeposits.map((fd, index) => (
              <Card key={index} x-chunk="dashboard-05-chunk-1" className="w-1/3">
                <CardHeader className="pb-2">
                  <div className="flex w-full justify-between">
                    <CardDescription>Fixed Deposit</CardDescription>
                  </div>
                  <CardTitle className="text-xl font-semibold">FD Account Number</CardTitle>
                  <CardTitle className="text-lg">{fd.accountNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <span className="text-lg font-semibold">FD Balance :</span> {formatINRCurrency(fd.depositamt)}
                  </div>
                  <div className='flex'>
                    <div className="text-sm font-semibold mb-4">Invested Amount :</div>
                    <div>{formatINRCurrency(fd.depositamt * 0.7)}</div>
                  </div>
                </CardContent>

              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const CustomBarGraph = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 w-full border p-4 space-x-2">
        No Data
      </div>
    );
  }

  const maxAmount = Math.max(...data.map(item => item.amount));

  return (
    <div className="flex flex-col items-center h-64 w-full border rounded-sm p-4 overflow-x-auto">
      <div className="flex items-end justify-around h-full w-full space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="bg-blue-500 transition-all duration-300 rounded-t-sm"
              style={{ height: `${(item.amount / maxAmount) * 170}px`, width: '20px' }}
            ></div>
            <span className="mt-2 text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
