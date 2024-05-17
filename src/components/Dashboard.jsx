import Navbar from "./NavBar";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowLeftRight, ArrowUpRight, Eye, EyeOff, IndianRupee, PiggyBank, SquarePlus, User2, Users, Vault } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { formatINRCurrency } from "../lib/currencyFormatter";
import { useDispatch, useSelector } from "react-redux";
import { addBeneficiary, setBeneficiaries } from "../redux/features/beneficiarySlice";
import Cookies from "js-cookie"
import { setAccounts } from "../redux/features/accountSlice";
import { setTransactions } from "../redux/features/transactionSlice";
import { setFD } from "../redux/features/fdSlice";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userAccount = useSelector((state) => state.user.user)
  const accounts = useSelector((state) => state.account)
  const transactions = useSelector((state) => state.transactions.transactions)

  console.log(accounts);

  const user = Cookies.get("userToken")
  const dispatch = useDispatch();
  // const accounts = [
  //   { accountNumber: '123456789', balance: 34654, type: 'Primary' },
  //   { accountNumber: '987654321', balance: 12345, type: 'Primary' },
  //   { accountNumber: '567890123', balance: 67890, type: 'Primary' },
  //   { accountNumber: '567890123', balance: 67890, type: 'Primary' },
  // ];
  const [visibleBalances, setVisibleBalances] = useState(Array(accounts.length).fill(false));

  const handleShowBalance = (index) => {
    const newVisibleBalances = [...visibleBalances];
    newVisibleBalances[index] = !newVisibleBalances[index];
    setVisibleBalances(newVisibleBalances);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const accresponse = await fetch(` http://54.147.158.222:9191/acttrans/account/byuserid/${user}`);
    const accountDetails = await accresponse.json();
    console.log(accountDetails);
    dispatch(setAccounts(accountDetails))
    const accTranasaction = await fetch(`http://54.147.158.222:9191/acttrans/transaction/byuserid/${user}`);
    const accountTransaction = await accTranasaction.json();
    console.log("transaction", accountTransaction);
    dispatch(setTransactions(accountTransaction))
    const accFDSResponse = await fetch(` http://3.220.63.21:9191/fixeddeposit/byuserid/${user}`);
    const accFDS = await accFDSResponse.json();
    console.log(accFDS);
    dispatch(setFD(accFDS.entity))
    const accBenResponse = await fetch(`  http://72.44.55.218:9191/benefeciary/byuserid/${user}`);
    const accBenResult = await accBenResponse.json();
    console.log(accBenResult);
    dispatch(setBeneficiaries(accBenResult.entity))
    setIsLoading(false);


  }

  useEffect(() => {

    fetchData()

  }, [])




  return (
    <>
      {!isLoading ? <>

        <div className="flex flex-row items-center justify-start w-full mt-4 gap-6 overflow-x-scroll">
          {accounts.accounts.map((account, index) => (

            <Card key={index} className="min-w-[350px] m-2">
              <CardHeader className="pb-2">
                <div className="flex w-full justify-between">
                  <CardDescription>Account type</CardDescription>
                  <Badge variant="outline">{account.type}</Badge>
                </div>
                <CardTitle className="text-xl font-semibold">Account Number</CardTitle>
                <CardTitle className="text-lg">{account.accountNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="text-lg font-semibold">Account Balance:</span>{" "}
                  {visibleBalances[index] ? formatINRCurrency(account.accountBalance) : '****'}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to={`/account/${account.accountNumber}`}><Button variant="outline"
                  size="sm"
                  className="text-xs ml-2" >More details</Button> </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleShowBalance(index)}
                >
                  {visibleBalances[index] ? 'Hide Balance' : 'Show Balance '}
                  {visibleBalances[index] ? <EyeOff className="h-5 w-5 ml-1" /> : <Eye className="h-5 w-5 ml-1" />}
                </Button>


              </CardFooter>
            </Card>

          ))}
        </div>




        <div className="flex flex-row justify-around w-full mt-2">
          <div className="w-2/4 pl-5">
            <h1 className="text-3xl   font-semibold "> Quick Actions</h1>
            <div className=" flex flex-row w-full flex-wrap">
              <Card className="w-36 mt-3 ml-10 hover:bg-black hover:text-white cursor-pointer" onClick={() => { navigate("/fund-transfer") }}>
                <CardHeader>
                  <div className="flex gap-3  hover:gap-10">
                    <IndianRupee />
                    <ArrowLeftRight />
                  </div>
                  <CardTitle className="text-base font-semibold">Fund transfer</CardTitle>
                </CardHeader>
              </Card>
              <Card className="w-36 mt-3 ml-10 hover:bg-black hover:text-white cursor-pointer" onClick={() => { navigate("/add-account") }}>
                <CardHeader>
                  <div className="flex gap-3  hover:gap-10">
                    <SquarePlus />
                  </div>
                  <CardTitle className="text-base font-semibold">Add Account</CardTitle>
                </CardHeader>
              </Card>
              <Card className="w-36 mt-3 ml-10 hover:bg-black hover:text-white cursor-pointer" onClick={() => { navigate("/add-beneficiary") }}>
                <CardHeader>
                  <div className="flex gap-3  hover:gap-10">
                    <User2 />

                  </div>
                  <CardTitle className="text-base font-semibold">Add Beneficiary</CardTitle>
                </CardHeader>
              </Card>
              <Card className="w-36 mt-3 ml-10 hover:bg-black hover:text-white cursor-pointer" onClick={() => { navigate('/fixed-deposit') }}>
                <CardHeader>
                  <div className="flex gap-3  hover:gap-10">
                    <PiggyBank />

                  </div>
                  <CardTitle className="text-base font-semibold">Open Fixed Deposit</CardTitle>
                </CardHeader>
              </Card>
              <Card className="w-36 mt-3 ml-10 hover:bg-black hover:text-white cursor-pointer" onClick={() => { navigate('/show-beneficiary') }}>
                <CardHeader>
                  <div className="flex gap-3  hover:gap-10">

                    <Users />

                  </div>
                  <CardTitle className="text-base font-semibold">Show Beneficiaries</CardTitle>
                </CardHeader>
              </Card>
              <Card className="w-36 mt-3 ml-10 hover:bg-black hover:text-white cursor-pointer" onClick={() => { navigate('/show-fd') }}>
                <CardHeader>
                  <div className="flex gap-3  hover:gap-10">
                    <Vault />

                  </div>
                  <CardTitle className="text-base font-semibold">Show Fixed Deposits</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="ml-5 w-2/4"> <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions of your Account.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="/transactions">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
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

          </Card></div>
        </div>
      </> : <><div><Loader /></div></>
      }
    </>
  );
};

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};
export default Dashboard;
