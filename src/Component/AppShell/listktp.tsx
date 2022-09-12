import { Button, createStyles, ScrollArea, Text, UnstyledButton, Anchor, Card, SimpleGrid, Group, Grid } from '@mantine/core';
import React, { Dispatch, SetStateAction } from 'react'
interface ChildProps {
    data: any;
    archive: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    setArchive: React.Dispatch<React.SetStateAction<any>>;
}
const ListKTP = ({ setData, setArchive, archive, data }: ChildProps) => {
    const onArchive = (value: any) => {
        setData(data.filter((item: any) => item !== value))
        setArchive([...archive, value])
    }
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
        <Grid.Col md={4} mt="md" >

            <UnstyledButton key={key} className={classes.item}>
                <Text size="xs" mt={7}>
                    {item.name}
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
            </UnstyledButton>
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