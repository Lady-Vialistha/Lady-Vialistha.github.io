import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { collection, doc, setDoc, getDocs, onSnapshot, addDoc } from "@firebase/firestore";
import db from "../Firebase/realtime-config.js"

interface ChildProps {
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>;
    setArchive: React.Dispatch<React.SetStateAction<any>>;
}
const InputKTP = ({ setData, data, setArchive }: ChildProps) => {
    const [User, setUser] = React.useState<string>("")
    const [Email, setEmail] = React.useState("")
    const [Telp, setTelp] = React.useState("")
    const [Ktp, setKtp] = React.useState("")

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
            const items = snapshot.docs.map((doc: any) => ({
                user: doc.user,
                email: doc.email,
                telp: doc.telp,
                ktp: doc.ktp,
                ...doc.data()
            }));
            return setData(items);
        })
    }, [])

    const docRef = collection(db, "List");
    const getRef: any = getDocs(docRef);
    const handleSubmit = (values: any) => {
        if (getRef !== "") {
            addDoc(collection(db, "List"), {
                user: values.user,
                email: values.email,
                telp: values.telp,
                ktp: values.ktp
            })
                .then(() => {
                    setData([...data, values])
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
                        value={User}
                        onChange={e => setUser(e.target.value)}
                        {...form.getInputProps("user")}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        value={Email}
                        onChange={e => setEmail(e.target.value)}
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        withAsterisk
                        label="No. Phone"
                        type="number"
                        placeholder="081290007685"
                        value={Telp}
                        onChange={e => setTelp(e.target.value)}
                        {...form.getInputProps("telp")}
                    />
                    <TextInput
                        withAsterisk
                        label="No. KTP"
                        type="number"
                        placeholder="3275059488300987"
                        value={Ktp}
                        onChange={e => setKtp(e.target.value)}
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
