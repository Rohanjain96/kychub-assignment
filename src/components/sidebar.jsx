import React from 'react'
import { NavLink } from 'react-router'

const Items = [
    {
        id: 1,
        name: 'Products',
        url: '/'
    },
    {
        id: 2,
        name: 'Compare Products',
        url: '/compare-products'
    },
]
const Sidebar = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: "start",
            padding: "24px",
            width: '200px',
            height: '100%',
            borderRight: '1px solid',
            borderColor: "Gray",
        }}>
            {
                Items.map((item) => {
                    return (
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            key={item.id}
                            to={item.url}
                            style={{
                                textDecoration: 'none',
                                paddingBlock: '16px',
                            }}>{item.name}</NavLink>
                    )
                })
            }
        </div>
    )
}

export default Sidebar