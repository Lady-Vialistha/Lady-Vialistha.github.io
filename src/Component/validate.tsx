import { TextInput, Checkbox, Button, Group, Box, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react'
import { resourceLimits } from 'worker_threads';
import { useNavigate } from 'react-router-dom'
import "../App.css";
import DoList from './todoList';

const ValidateForm = () => {
    const history = useNavigate()
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            telp: '',
            ktp: '',
            pass: '',
            termsOfService: false,
        },
        validate: {
            name: (value) => value ? null : "Invalid Name",
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            telp: value => value ? null : "Invalid No. Phone",
            ktp: value => value ? null : "Invalid No. KTP",
            pass: (value) => value ? null : "Invalid Password",
            termsOfService: (value: any) => value ? null : "Harus dicentang"

        },
    });
    function submitAndCheck() {
        // cek error
        if (Object.keys(form.errors).length === 0 && Object.values(form.validate()).length !== 0) {
            showNotification({
                title: "Good Job!!",
                message: "Submit successfully!!"
            })
            localStorage.setItem("login", "login")
            history("/todolist")
            window.location.reload();
        }
    }
    return (
        <div className="wrapper">
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))} className="parent-form">
                    <TextInput
                        withAsterisk
                        label="Name"
                        type="text"
                        placeholder="yourfullname"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        label="No. Phone"
                        type="number"
                        placeholder="081290007685"
                        {...form.getInputProps('telp')}
                    />
                    <TextInput
                        withAsterisk
                        label="No. KTP"
                        type="number"
                        placeholder="3275059488300987"
                        {...form.getInputProps('ktp')}
                    />
                    <TextInput
                        withAsterisk
                        label="Password"
                        type="password"
                        placeholder="yourpassword"
                        {...form.getInputProps('pass')}
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
export default ValidateForm;