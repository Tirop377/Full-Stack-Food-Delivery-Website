import  { useEffect, useState } from 'react'
import './List.css'
import axois from 'axios'
import {toast} from 'react-toastify';
import PropTypes from 'prop-types'

const List = ({url}) => {
  const [list, setList] = useState([]);
  const fetchList = async ()=>{
    const response = await axois.get(`${url}/api/food/list`);

    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error occured");
    }
  }

  useEffect(()=>{
    fetchList();
  }, [])

  const removeFood = async (foodId)=>{
    const response = await axois.post(`${url}/api/food/remove`, {id:foodId});
    await fetchList();

    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error("Error occured")
    }
  }


  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
            
          )
        })}
        
      </div>


      
    </div>
  )
}


List.propTypes = {
  url:PropTypes.string.isRequired
}

export default List


