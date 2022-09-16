import { Button, createStyles, ScrollArea, Text, UnstyledButton, Anchor, Card, SimpleGrid, Group, Grid, Paper } from '@mantine/core';
import { FirebaseError } from 'firebase/app';
import { onSnapshot, addDoc, getDocs, Firestore, collection, doc, updateDoc, query, setDoc } from 'firebase/firestore';
import { get } from 'http';
import React, { Dispatch, SetStateAction } from 'react'
import db from '../Firebase/realtime-config';
interface ChildProps {
    data: any;
    archive: any;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<any>>;
    setData: React.Dispatch<React.SetStateAction<any>>;
    setArchive: React.Dispatch<React.SetStateAction<any>>;
}
const ListKTP = ({ setData, setArchive, archive, data, status, setStatus }: ChildProps) => {
    const onArchive = async (values: any) => {
        setData((item: any) => item !== values)
        setArchive([...archive, values])
        const docRef = doc(db, "List", values.user);
        await setDoc(doc(db, "List"), {
            user: values.user,
            email: values.email,
            telp: values.telp,
            ktp: values.ktp,
            status: status
        })
            .then(() => {
                return console.log("berhasil")
            })
            .catch((e: any) => {
                console.log("error", e)
            })
        await updateDoc(docRef, {
            status: "arsip"
        })
            .then(() => {
                return setStatus(status)
            })
            .catch((e: any) => {
                console.log("error arsip", e)
            })



        // const q = query(collection(db, "List"));
        // const querySnapshot = await getDocs(q);
        // let docUser = "";
        // querySnapshot.forEach(async (doc: any) => {
        //     docUser = doc.user;
        //     const user = doc(db, "List", docUser);
        //     await updateDoc(user, {
        //         status: "arsip"
        //     })
        // });





        // var ref = doc(db, "List", values.user);
        // const docRef = collection(db, "List", values.user);
        // const getRef: any = getDocs(docRef);
        // updateDoc(ref, {
        //     user: values.user,
        //     email: values.email,
        //     telp: values.telp,
        //     ktp: values.ktp,
        //     status: status
        // })
        //     .then(() => {
        //         setArchive([...archive, values])
        //     })
        //     .catch((e: any) => {
        //         alert(e);
        //     });





        // var ref = doc(db, "TheList", inputId.value);
        // await updateDoc(ref, {
        //     nameOfName: inputName.value,
        //     nameOfID: inputId.value,
        // })
        //     .then(() => {
        //         alert("berhasil");
        //         inputId.value = "";
        //         inputName.value = "";
        //     })
        //     .catch((error) => {
        //         alert("error" + error);
        //     });
        //     setData(data.filter((item: any) => item !== values))
        //     setArchive([...archive, values])
    }

    // cari di firebase, data dengan id item.id
    // ubah item.status di firebase menjadi "archive"
    // db.collection("List")
    //     .doc(values.id)
    //     .update({ status: "archive" });



    const useStyles = createStyles((theme) => ({
        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            textAlign: "left"
        },

        title: {
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
        },
        button: {
            width: "100%",
            marginTop: "5px",
        },
        text: {
            textAlign: "center"
        },

        item: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'left',
            borderRadius: theme.radius.md,
            height: "fit-content",
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.blue[0],
            transition: 'box-shadow 150ms ease, transform 100ms ease',
            padding: "31px",
            width: "90%",
            margin: "auto",

            '&:hover': {
                boxShadow: `${theme.shadows.md} !important`,
                transform: 'scale(1.05)',
            },
        },
    }));

    const { classes } = useStyles();

    const items = data.map((item: any, key: any) => (
        <Grid.Col md={4} mt="md" key={key}>
            <Paper className={classes.item}>
                <Text size="xs" mt={7}>
                    {item.user}
                </Text>
                <Text size="xs" mt={7}>
                    {item.email}
                </Text>
                <Text size="xs" mt={7}>
                    {item.telp}
                </Text>
                <Text size="xs" mt={7}>
                    {item.ktp}
                </Text>
                <Button className={classes.button} onClick={() => onArchive(item)}>Arsip</Button>
            </Paper>
        </Grid.Col>
    ));
    return (
        <ScrollArea>
            {data.length > 0 ? <Card radius="md" className={classes.card}>
                <Grid>
                    {items}
                </Grid>
            </Card> : <Text className={classes.text}>Tidak Ada Data</Text>}
        </ScrollArea>
    )
}
export default ListKTP;

function ref(db: Firestore) {
    throw new Error('Function not implemented.');
}
function child(dbRef: void, arg1: string): string | import("http").RequestOptions | import("url").URL {
    throw new Error('Function not implemented.');
}

