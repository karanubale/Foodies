import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ catagory, setCatagory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>What's on your mind?</h1>
            <p className="explore-menu-text">
                {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo culpa numquam dolor! Quam, pariatur temporibus quas, ex ab error vitae soluta saepe similique maxime officiis quasi nostrum suscipit voluptas aspernatur! */}
            </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCatagory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                            <img className={catagory===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                            {/* //mistake */}
                            <p>{item.catagory}</p>
                        </div>
                    )
                })}
            </div>
            <hr />

        </div>
    )
}

export default ExploreMenu