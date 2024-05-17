import React, { useState } from 'react'
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"

import { Link } from 'react-router-dom'
import { Input } from './ui/input'

const Setting = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingTransactionPassword, setIsEditingTransactionPassword] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleEditPassword = () => {
        setIsEditingPassword(!isEditingPassword);
    }
    const submitConfirm = () => {
        setIsEditingPassword(!isEditingPassword);
        console.log("Confirming the password");
    }
    const handleEditTransactionPassword = () => {
        setIsEditingTransactionPassword(!isEditingPassword);
    }
    const submitTransactionConfirm = () => {
        setIsEditingTransactionPassword(!isEditingPassword);
        console.log("Confirming the password");
    }
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] w-full flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">

            <div className="mx-auto grid w-10/12 max-w-6xl items-start gap-6 ">

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Details</CardTitle>
                            <CardDescription>Manage your profile information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-4">
                                <Input
                                    placeholder="First Name"
                                    defaultValue="Your First name"
                                    disabled={true}
                                />
                                <Input
                                    placeholder="Last Name"
                                    defaultValue="Your Last name"
                                    disabled={true}
                                />
                                <Input
                                    placeholder="Email"
                                    defaultValue="example@email.com"
                                    disabled={!isEditing}
                                />
                                <Input
                                    placeholder="Phone Number"
                                    defaultValue="+91 23456789"
                                    disabled={!isEditing}
                                />
                                <Input
                                    placeholder="Username"
                                    defaultValue="username"
                                    disabled={true}
                                />

                                {!isEditingPassword && <Input
                                    type="password"
                                    placeholder="Password"
                                    defaultValue="********"
                                    disabled
                                />}
                                {isEditingPassword && (
                                    <Input
                                        type="password"
                                        placeholder="Old Password"
                                    />
                                )}
                                {isEditingPassword && (
                                    <Input
                                        type="password"
                                        placeholder="New Password"
                                    />
                                )}
                                {!isEditingTransactionPassword && <Input
                                    type="password"
                                    placeholder="Transaction Password"
                                    defaultValue="********"
                                    disabled
                                />}
                                {isEditingTransactionPassword && <Input
                                    type="password"
                                    placeholder="Old Transaction Password"

                                    disabled
                                />}
                                {isEditingTransactionPassword && <Input
                                    type="password"
                                    placeholder="New Transaction Password"

                                    disabled
                                />}



                            </form>
                            <div className='flex flex-row gap-4 '>
                                {isEditingPassword ? <div><Button className="mt-4 w-fit" onClick={submitConfirm} variant="outline" >
                                    Confirm Password
                                </Button></div> : <div><Button onClick={handleEditPassword} variant="outline" className="w-fit mt-4 ">
                                    Change Password
                                </Button></div>}
                                {isEditingTransactionPassword ? <Button className="mt-4 w-fit" onClick={submitTransactionConfirm} variant="outline" >
                                    Confirm Tranasction Password
                                </Button> : <Button onClick={handleEditTransactionPassword} variant="outline" className="w-fit mt-4 ">
                                    Change Transaction Password
                                </Button>}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    )
}

export default Setting
