import React from 'react'
import { AppShell, Navbar, Header, NavLink, useMantineTheme, Aside, Footer, MediaQuery, Text, Burger, createStyles, Tooltip, UnstyledButton, Title } from '@mantine/core';
import { Link, Routes, Route, useLocation, } from 'react-router-dom';
import { useState } from 'react';
import { MantineLogo } from '@mantine/ds';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
} from '@tabler/icons';
import "../AppShell/appShell.css"
import IconTheme from '../Icon/iconTheme';
import InputKTP from './inputktp';
import ListKTP from './listktp';
import ArchiveKTP from './archivektp';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '../Firebase/realtime-config';
const AppshellComponent = () => {
    const location = useLocation()
    const [data, setData] = React.useState<any>([])
    const [archive, setArchive] = React.useState<any>([])
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(true)
    const [openNavLink, setOpenNavLink] = React.useState(false)
    const theme = useMantineTheme();


    React.useEffect(() => {
        onSnapshot(collection(db, "List"), (snapshot: any) => {
            const items = snapshot.docs.map((doc: any) => ({
                user: doc.user,
                email: doc.email,
                telp: doc.telp,
                ktp: doc.ktp,
                arsip: doc.arsip,
                ...doc.data()
            }));
            return setData(items);
        })
    }, [])
    const useStyles = createStyles((theme) => ({
        wrapper: {
            display: 'flex',
        },

        aside: {
            flex: '0 0 60px',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
                }`,
        },

        main: {
            flex: 1,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        mainLink: {
            width: 44,
            height: 44,
            borderRadius: theme.radius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
            },
        },

        mainLinkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },

        title: {
            boxSizing: 'border-box',
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            marginBottom: theme.spacing.xl,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            padding: theme.spacing.md,
            paddingTop: 18,
            height: 60,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
                }`,
        },

        logo: {
            boxSizing: 'border-box',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: 60,
            paddingTop: theme.spacing.md,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
                }`,
            marginBottom: theme.spacing.xl,
        },

        test: {
            color: 'blue',
            backgroundColor: 'dark',

        },

        button: {
            color: theme.white,
            backgroundColor: theme.colors.orange[6],
            border: 0,
            borderRadius: theme.radius.md,
            padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
            cursor: 'pointer',
            margin: theme.spacing.md,

            // Use pseudo-classes just like you would in Sass
            '&:hover': {
                backgroundColor: theme.colors.blue[9],
            },

            '&:not(:first-of-type)': {
                backgroundColor: theme.colors.violet[6],

                // pseudo-classes can be nested
                '&:hover': {
                    backgroundColor: theme.colors.violet[9],
                },
            },
        },


        link: {
            boxSizing: 'border-box',
            display: 'block',
            textDecoration: 'none',
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            padding: `0 ${theme.spacing.md}px`,
            fontSize: theme.fontSizes.sm,
            marginRight: theme.spacing.md,
            fontWeight: 500,
            height: 44,
            lineHeight: '44px',

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },

        linkActive: {
            '&, &:hover': {
                borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                    .background,
                backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                    .background,
                color: theme.white,
            },
        },
    }));
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Home');

    const mainLinksMockdata = [
        { icon: IconHome2, label: 'Home' },
    ];
    const handleNavLink = () => {
        const minWidth = window.innerWidth;
        if (minWidth > 280 && minWidth < 769) {
            setOpenSidebar(!openSidebar)
        }
        else {
            setOpenSidebar(true)
        }
    }
    const handleSidebar = () => {
        const minWidth = window.innerWidth;
        if (minWidth > 280 && minWidth < 769) {
            setOpenSidebar(!openSidebar)
        } else {
            setOpenSidebar(true)
        }
    }

    const mainLinks = mainLinksMockdata.map((link) => (
        <Tooltip label={link.label} position="right" withArrow transitionDuration={0} key={link.label}>
            <UnstyledButton
                onClick={() => handleSidebar()}
                className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
            >
                <link.icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    ));
    const handleWidth = () => {
        const minWidth = window.innerWidth;
        if (minWidth > 280 && minWidth < 769) {
            return (
                <Navbar height={750} width={{ sm: 300 }} style={{ background: openSidebar ? "white" : "transparent", borderRight: openSidebar ? "1px solid #e9ecef" : 0, width: openSidebar ? "100%" : 0 }} >
                    <Navbar.Section grow className={classes.wrapper}>
                        <div className={classes.aside}>
                            {mainLinks}
                        </div>
                        {openSidebar && <div className={classes.main}>
                            <Title order={4} className={classes.title}>
                                {active}
                            </Title>
                            <div>
                                <NavLink label="Input Data KTP" component={Link} to="/" active={location.pathname === '/'} onClick={() => handleNavLink()} />
                                <NavLink label="List Data KTP" component={Link} to="/list" active={location.pathname === '/list'} onClick={() => handleNavLink()} />
                                <NavLink label="Arsip Data KTP" component={Link} to="/arsip" active={location.pathname === '/arsip'} onClick={() => handleNavLink()} />
                            </div>
                        </div>}
                    </Navbar.Section>
                </Navbar>
            )
        }
        else {
            return (
                <Navbar height={750} width={{ sm: 300 }} style={{ background: openSidebar ? "white" : "transparent", borderRight: openSidebar ? "1px solid #e9ecef" : 0, width: openSidebar ? "fit-content" : 0 }} >
                    <Navbar.Section grow className={classes.wrapper}>
                        <div className={classes.aside}>
                            {mainLinks}
                        </div>
                        {openSidebar && <div className={classes.main}>
                            <Title order={4} className={classes.title}>
                                {active}
                            </Title>
                            <div>
                                <NavLink label="Input Data KTP" component={Link} to="/" active={location.pathname === '/'} onClick={() => handleNavLink()} />
                                <NavLink label="List Data KTP" component={Link} to="/list" active={location.pathname === '/list'} onClick={() => handleNavLink()} />
                                <NavLink label="Arsip Data KTP" component={Link} to="/arsip" active={location.pathname === '/arsip'} onClick={() => handleNavLink()} />
                            </div>
                        </div>}
                    </Navbar.Section>

                </Navbar>
            )
        }
    }


    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            padding="md"
            navbar={
                handleWidth()
            }
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <h4>Data Kartu Tanda Penduduk</h4>
                    </div>
                </Header>
            }

        >
            <Routes>
                <Route path="/" element={<InputKTP setData={setData} data={data} setArchive={setArchive} />} />
                <Route path="/list" element={<ListKTP setData={setData} archive={archive} setArchive={setArchive} data={data} />} />
                <Route path="/arsip" element={<ArchiveKTP archive={archive} setArchive={setArchive} />} />
            </Routes>
            <IconTheme />

        </AppShell>
    );
}

export default AppshellComponent