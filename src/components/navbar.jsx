import { Avatar } from "antd";
import React from "react";

const Navbar = () => {
    return (
        <div
            className="navbar"
            style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
                paddingInline: "24px",
                paddingBlock: "16px",
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'white',
            }}
        >
            <img src="/logo.svg" alt="logo" width="150px" />

            <Avatar alt='rohan'>R</Avatar>
        </div>
    );
};

export default Navbar;
