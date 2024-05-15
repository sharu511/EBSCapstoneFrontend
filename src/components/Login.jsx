import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Login() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-xl md:w-2/6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-3xl mb-4 text-center text-blue-700">
                            Login
                        </CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="yourname@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                className="focus:outline-none focus:ring focus:ring-blue-800"
                                type="password"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-blue-600">Log in</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
