import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import {
    collection,
    addDoc,
    onSnapshot,
    getDocs,
} from "firebase/firestore";
import db from "../Firebase/realtime-config.js"

interface ChildProps {
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>;
}
const InputKTP = ({ setData, data }: ChildProps) => {
    const [User, setUser] = React.useState("")
    const [Email, setEmail] = React.useState("")
    const [Telp, setTelp] = React.useState("")
    const [Ktp, setKtp] = React.useState("")
    const docRef = collection(db, "TheList");
    const getRef: any = getDocs(docRef);

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
    function submitAndCheck() {
        // cek error
        if (Object.keys(form.errors).length === 0) {
            showNotification({
                title: "Good Job!!",
                message: "Submit successfully!!"
            })
        }

    }
    React.useEffect(() => {
        onSnapshot(collection(db, "List"), (snapshot: any) => {
            const items: any[] = [];
            snapshot.docs.forEach((doc: any) => {
                items.push({ ...doc.data(), user: doc.username, email: doc.email, telp: doc.telp, ktp: doc.ktp });
                return { ...doc.data() };
            });
            return setData(items)
        })
    }, [])
    const handleSubmit = () => {
        if (getRef !== "") {
            try {
                addDoc(collection(db, "List"), {
                    username: User,
                    email: Email,
                    telp: Telp,
                    ktp: Ktp
                })
                return alert("success")

            }
            catch (e: any) {
                return alert(e)
            }
        } else {
            alert("empty data")
        }
    }
    return (
        <div className="wrapper">
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                    <TextInput
                        withAsterisk
                        label="Username"
                        type="text"
                        placeholder="yourusername"
                        value={User}
                        {...form.getInputProps("user")}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        value={Email}
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        withAsterisk
                        label="No. Phone"
                        type="number"
                        placeholder="081290007685"
                        value={Telp}
                        {...form.getInputProps("telp")}
                    />
                    <TextInput
                        withAsterisk
                        label="No. KTP"
                        type="number"
                        placeholder="3275059488300987"
                        value={Ktp}
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
