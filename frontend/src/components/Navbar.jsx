import React, { useEffect, useState } from "react";
import {
    Layout,
    Menu,
    Dropdown,
    Avatar,
    Space,
    Input,
    Button,
    Drawer,
} from "antd";
import {
    UserOutlined,
    SearchOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        let userData = null;
        try {
            userData = userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error("Invalid user data in localStorage", error);
            localStorage.removeItem("user");
            userData = null;
        }
        if (token && userData) {
            setUser(userData);
        } else {
            setUser(null);
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const pathKeyMap = {
        "/": "home",
        "/dashboard": "dashboard",
        "/about": "about",
        "/contact": "contact",
    };
    const selectedKey = pathKeyMap[location.pathname] || "";

    const menuItems = [
        {
            key: "home",
            label: <Link to="/">Home</Link>,
        },
        ...(user
            ? [
                {
                    key: "dashboard",
                    label: <Link to="/dashboard">Dashboard</Link>,
                },
            ]
            : []),
        {
            key: "about",
            label: <Link to="/about">About</Link>,
        },
        {
            key: "contact",
            label: <Link to="/contact">Contact</Link>,
        },
    ];

    const userMenuItems = user
        ? [
            {
                key: "profile",
                label: <Link to="/profile">👤 Profile</Link>,
            },
            {
                type: "divider",
            },
            {
                key: "logout",
                label: (
                    <span onClick={handleLogout} style={{ color: "red" }}>
                        🔓 Logout
                    </span>
                ),
            },
        ]
        : [
            {
                key: "login",
                label: <Link to="/login">🔐 Login</Link>,
            },
            {
                key: "signup",
                label: <Link to="/signup">📝 Sign Up</Link>,
            },
        ];

    return (
        <>
            <Header
                className="shadow-md sticky top-0 z-50"
                style={{
                    background: "#f5faff",
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    overflow: "visible",
                }}
            >
                {/* Brand */}
                <div
                    className="text-[20px] sm:text-[22px] md:text-[26px] font-bold text-[#1677ff]"
                    style={{ flexShrink: 0 }}
                >
                    <Link to="/">CareerCrafter.AI</Link>
                </div>

                {/* Desktop Menu */}
                {!isMobile && (
                    <Menu
                        mode="horizontal"
                        selectedKeys={[selectedKey]}
                        items={menuItems}
                        style={{
                            borderBottom: "none",
                            fontWeight: 500,
                            background: "transparent",
                            flex: 1,
                            justifyContent: "center",
                            display: "flex",
                            overflow: "visible",
                        }}
                    />
                )}

                {/* Right Icons */}
                <div
                    className="flex items-center gap-4"
                    style={{ flexShrink: 0 }}
                >
                    {/* Search Icon */}
                    <div style={{ position: "relative" }}>
                        <SearchOutlined
                            style={{
                                fontSize: 20,
                                cursor: "pointer",
                                position: "relative",
                                top: 4,
                            }}
                            onClick={() => setShowSearch((prev) => !prev)}
                        />
                    </div>

                    {/* Profile */}
                    {!isMobile && (
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                        >
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar icon={<UserOutlined />} />
                                {user && (
                                    <span
                                        className="text-[#1677ff] font-semibold tracking-wide uppercase"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        {user.name
                                            .split(" ")[0]
                                            .toUpperCase()}
                                    </span>
                                )}
                            </Space>
                        </Dropdown>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <Button
                            icon={<MenuOutlined />}
                            onClick={() => setDrawerVisible(true)}
                        />
                    )}
                </div>
            </Header>

            {/* Search Box (non-mobile) */}
            {!isMobile && showSearch && (
                <div
                    style={{
                        position: "absolute",
                        right: 100,
                        top: 70,
                        zIndex: 999,
                        background: "white",
                        padding: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                >
                    <Input.Search
                        placeholder="Search..."
                        autoFocus
                        onBlur={() => setShowSearch(false)}
                        style={{ width: 300 }}
                        onSearch={(value) => console.log("Search:", value)}
                    />
                </div>
            )}

            {/* Mobile Search below navbar */}
            {isMobile && showSearch && (
                <div className="px-6 py-2 shadow-md bg-white">
                    <Input.Search
                        placeholder="Search..."
                        onSearch={(value) => console.log("Search:", value)}
                    />
                </div>
            )}

            {/* Drawer Menu (Mobile) */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={() => setDrawerVisible(false)}
                />
                <div className="mt-4 border-t pt-4">
                    <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
                        <div className="cursor-pointer flex items-center gap-2 mt-2">
                            <Avatar icon={<UserOutlined />} />
                            <span
                                className="text-[#1677ff] font-semibold uppercase"
                                style={{ fontSize: "1rem" }}
                            >
                                {user
                                    ? user.name.split(" ")[0].toUpperCase()
                                    : "ACCOUNT"}
                            </span>
                        </div>
                    </Dropdown>
                </div>
            </Drawer>
        </>
    );
};

export default Navbar;
