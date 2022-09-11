import React from 'react'
import { AppShell, Navbar, Header, Button, NavLink, MantineProvider, TextInput, Tabs } from '@mantine/core';
import { Link, Routes, Route, useLocation, } from 'react-router-dom';
import "../AppShell/appShell.css"
import IconTheme from '../Icon/iconTheme';
import InputKTP from './inputktp';
import ListKTP from './listktp';
import ArchiveKTP from './archivektp';
import { useForm } from '@mantine/form';
const AppshellComponent = () => {
    const location = useLocation()
    const [data, setData] = React.useState<any>([])
    // const [arr, setArray] = React.useState<any>([])
    const [archive, setArchive] = React.useState<any>([])
    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 300 }} height={500} p="xs">
                    <div className='sidebar'>
                        <NavLink label="Input Data KTP" component={Link} to="/" active={location.pathname === '/'} />
                        <NavLink label="List Data KTP" component={Link} to="/list" active={location.pathname === '/list'} />
                        <NavLink label="Arsip Data KTP" component={Link} to="/hapus" active={location.pathname === '/hapus'} />
                    </div>
                   
                </Navbar>
            }
            header={
                <Header height={60} p="xs">
                    <div className='wrapper'>
                        <code>Kartu Tanda Penduduk</code>
                        <IconTheme />
                    </div>
                </Header>}

        >
            <Routes>
                <Route path="/" element={<InputKTP setData={setData} data={data}/>} />
                <Route path="/list" element={<ListKTP setData={setData} archive={archive} setArchive={setArchive} data={data}/>} />
                <Route path="/hapus" element={<ArchiveKTP archive={archive} />} />
            </Routes>

        </AppShell>
    );
}

export default AppshellComponent