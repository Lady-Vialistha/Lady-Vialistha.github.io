import React from 'react';
import "../App.css"
import { TextInput, Button, Group, Box, Anchor, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

function Login() {
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [fillAlert, setFillAlert] = React.useState("")
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    const valid = (e: any) => {
        e.preventDefault();
        setIsSubmitted(() => true)
        if (user === "falah123" && pass === "falah0918123") {
            setFillAlert("Login has successfully!!")
            console.log("masuk")
        } else if (user && pass !== user && pass) {
            setFillAlert("username or password incorrect!!")
            window.scroll(0, 0)
            console.log("tidak masuk")
        } else {
            setFillAlert("username or password empty")
        }

    }

    return (
        <div className="App">
            {isSubmitted && <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                {fillAlert}
            </Alert>}
            <div className="wrapper">
                <Box sx={{ maxWidth: 300 }} mx="auto" className='parent-form'>
                    <h2>Login</h2>
                    <form>
                        <TextInput
                            onChange={(e) => setUser(e.target.value)}
                            label="Username"
                            placeholder="yourusername123"
                        />
                        <TextInput
                            onChange={(e) => setPass(e.target.value)}
                            label="Password"
                            placeholder="yourpassword123"

                        />
                        <Group position="right" mt="md">
                            <Button onClick={valid}>Submit</Button>
                        </Group>
                    </form>
                </Box>
            </div>

        </div>
    );
}

export default Login;
