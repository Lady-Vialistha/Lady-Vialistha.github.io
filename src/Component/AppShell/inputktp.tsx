import { TextInput, Checkbox, Button, Group, Box, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React, {Dispatch, SetStateAction} from 'react'
interface ChildProps {
    data: any,
    setData: React.Dispatch<React.SetStateAction<number>>;
  }
const InputKTP = ({ setData, data }: ChildProps) => {
    const [isShow, setShow] = React.useState(null)
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            telp: "",
            ktp: "",
            termsOfService: false,
        },
        validate: {
            name: (value) => value ? null : "Invalid Name",
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            telp: value => value ? null : "Invalid No. Phone",
            ktp: value => value ? null : "Invalid No. KTP",
            termsOfService: (value: any) => value ? null : "Harus dicentang"

        },
    });

    function submitAndCheck() {
        // cek error
        JSON.parse(localStorage.getItem("get") || "[]")
        if (Object.keys(form.errors).length === 0) {
            showNotification({
                title: "Good Job!!",
                message: "Submit successfully!!"
            })
        }
    }
    const handleSubmit = (value: any) =>{
        let getData:any = [...data, value]
        setData(getData)

    }
    return (
        <div className="wrapper">
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        type="text"
                        placeholder="yourfullname"
                        {...form.getInputProps("name")}
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
                        <Button type="submit" variant="outline"
                            onClick={submitAndCheck}>Submit</Button>
                    </Group>
                </form>
            </Box>
        </div>
    );
}

export default InputKTP;