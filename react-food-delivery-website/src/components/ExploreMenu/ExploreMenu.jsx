import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
import PropTypes from 'prop-types'


const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo voluptatem harum quas quod nisi et. voluptatem harum quas quod nisi et</p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index)=>{
                return(
                    <div key={index} onClick={()=>setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item'>
                        <img className={category==item.menu_name? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}

        </div>
        <hr />
    </div>
  )
}

ExploreMenu.propTypes = {
    category:PropTypes.string,
    setCategory:PropTypes.func
}

export default ExploreMenu
