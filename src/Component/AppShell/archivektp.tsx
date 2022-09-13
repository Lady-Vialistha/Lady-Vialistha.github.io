import React from 'react'
import { Table, ScrollArea, Text, createStyles, Button, Grid, Paper, Card } from '@mantine/core';
interface ChildProps {
    archive: any;
}
const ArchiveKTP = ({ archive }: ChildProps) => {
    console.log("arsip", archive)
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

    const items = archive.map((item: any, key: any) => (
        <Grid.Col md={4} sm={6} mt="md" key={key}>
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
            </Paper>
        </Grid.Col>
    ));
    return (
        <ScrollArea>
            {archive.length > 0 ? <Card radius="md" className={classes.card}>
                <Grid>
                    {items}
                </Grid>
            </Card> : <Text className={classes.text}>Tidak Ada Data</Text>}
        </ScrollArea>
    )
}
export default ArchiveKTP;