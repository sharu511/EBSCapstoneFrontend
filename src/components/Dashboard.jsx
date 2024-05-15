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

const Dashboard = () => {
  const userDetails = {
    username: "Sharvil",
    email: "sharvilm777@gmail.com",
    phone: "+91-985-985-985",
  };
  return (
    <>
      <Navbar user={userDetails} />
      <div className="flex flex-row items-center w-full mt-4 gap-4">
        {/* <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create New Order</Button>
          </CardFooter>
        </Card> */}
        <Card x-chunk="dashboard-05-chunk-1" className=" w-1/3">
          <CardHeader className="pb-2">
            <div className="flex w-full justify-between">
              <CardDescription>Account type</CardDescription>
              <Badge variant="outline">Primary</Badge>
            </div>
            <CardTitle className="text-xl font-semibold">
              Account Number
            </CardTitle>
            <CardTitle className="text-lg">123456789</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-lg font-semibold ">Account Balance :</span>{" "}
              ₹ 34,654
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm" className="text-xs">Show Balance</Button>
            </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1 " className=" w-1/3">
          <CardHeader className="pb-2">
            <div className="flex w-full justify-between">
              <CardDescription>Account type</CardDescription>
              <Badge variant="outline">Primary</Badge>
            </div>
            <CardTitle className="text-xl font-semibold">
              Account Number
            </CardTitle>
            <CardTitle className="text-lg">123456789</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-lg font-semibold ">Account Balance :</span>{" "}
              ₹ 34,654
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm" className="text-xs">Show Balance</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1 "className=" w-1/3">
          <CardHeader className="pb-2">
            <div className="flex w-full justify-between">
              <CardDescription>Account type</CardDescription>
              <Badge variant="outline">Primary</Badge>
            </div>
            <CardTitle className="text-xl font-semibold">
              Account Number
            </CardTitle>
            <CardTitle className="text-lg">123456789</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-lg font-semibold ">Account Balance :</span>{" "}
              ₹ 34,654
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm" className="text-xs">Show Balance</Button>
            </CardFooter>
        </Card>
        {/* <Card x-chunk="dashboard-05-chunk-2 w-3/4">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card> */}
      </div>
    </>
  );
};
export default Dashboard;
