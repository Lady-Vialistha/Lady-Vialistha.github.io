import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { collection, doc, setDoc, getDocs, onSnapshot, addDoc } from "@firebase/firestore";
import db from "../Firebase/realtime-config.js"

interface ChildProps {
    data: any,
    status: string,
    // setData: React.Dispatch<React.SetStateAction<any>>;
    setArchive: React.Dispatch<React.SetStateAction<any>>;
}
const InputKTP = ({ data, setArchive, status }: ChildProps) => {

    const form = useForm({
        initialValues: {
            user: "",
            email: "",
            telp: "",
            ktp: "",
            termsOfService: false,
        },
        validate: {
            user: (value) => value ? null : "Invalid Username",
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            telp: value => value ? null : "Invalid No. Phone",
            ktp: value => value ? null : "Invalid No. KTP",
            termsOfService: (value: any) => value ? null : "Harus dicentang"
        },
    });

    interface FormData {
        user: string,
        email: string,
        telp: string,
        ktp: string,
        termsOfService: boolean
    }

    function submitAndCheck() {
        // cek error
        if (form.isValid()) {
            showNotification({
                title: "Good Job!!",
                message: "Submit successfully!!"
            })
        }
        // if (Object.keys(form.errors).length === 0) {
        //     showNotification({
        //         title: "Good Job!!",
        //         message: "Submit successfully!!"
        //     })
        // }
    }

    const docRef = collection(db, "List");
    const getRef: any = getDocs(docRef);

    const handleSubmit = (values: FormData) => {

        if (getRef !== "") {
            addDoc(collection(db, "List"), {
                user: values.user,
                email: values.email,
                telp: values.telp,
                ktp: values.ktp,
                status: status
            })
                .then(() => {
                    // setData([...data, values])
                })
                .catch((e: any) => {
                    alert(e);
                });
        } else {
            alert("Empty data");
        }
    }


    return (
        <div className="wrapper">
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        withAsterisk
                        label="Username"
                        type="text"
                        placeholder="yourusername"
                        {...form.getInputProps("user")}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        withAsterisk
                        label="No. Phone"
                        type="number"
                        placeholder="081290007685"
                        {...form.getInputProps("telp")}
                    />
                    <TextInput
                        withAsterisk
                        label="No. KTP"
                        type="number"
                        placeholder="3275059488300987"
                        {...form.getInputProps("ktp")}
                    />
                    <Checkbox
                        mt="md"
                        label="Saya setuju dengan privasi policy"
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit"
                            onClick={submitAndCheck}>Submit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    );
}

export default InputKTP;
