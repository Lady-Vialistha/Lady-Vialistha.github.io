import { Button, Input } from '@mantine/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css";

const DoList = () => {
    const history = useNavigate()
    interface TaskName {
        taskName: string,
    }
    const [task, setTask] = React.useState<string>("")
    const [arr, setArr] = React.useState<TaskName[]>([])

    const handleChange = (e: any): void => {
        setTask(e.target.value)
    }
    const add = (): void => {
        const newTask = { taskName: task }
        setArr([...arr, newTask])
        setTask("")
    }
    function logout() {
        history("/")
    }
    return (
        <div className="wrapper" style={{ maxWidth: "60%" }}>
            <Input type="text" placeholder="Add your tasks" onChange={handleChange} value={task} />
            <div>
                {arr.map((item, key: number) => {
                    return (
                        <div key={key}>
                            <ul>
                                <li>{item.taskName}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button type="button" onClick={add}>
                    Submit
                </Button>
                <Button type="button" onClick={logout}>
                    Logout
                </Button>

            </div>
        </div>
    )
}
export default DoList;