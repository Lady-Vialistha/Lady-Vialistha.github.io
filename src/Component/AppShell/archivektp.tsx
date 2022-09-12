import React from 'react'
import { Table, ScrollArea, Text, createStyles } from '@mantine/core';
import { ClassNames } from '@emotion/react';
interface ChildProps {
    archive: any;
}
const ArchiveKTP = ({ archive }: ChildProps) => {
    const useStyles = createStyles(() => ({
        text: {
            textAlign: "center"
        }
    }))
    const { classes } = useStyles();
    return (
        <ScrollArea>
            {archive.length > 0 ? archive.map((item: any, key: any) => {
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover key={key}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>No. Phone</th>
                            <th>No. KTP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.telp}</td>
                        <td>{item.ktp}</td>
                    </tbody>

                </Table>
            }) : <Text className={classes.text}>Tidak Ada Data</Text>}
        </ScrollArea>
    )
}
export default ArchiveKTP;