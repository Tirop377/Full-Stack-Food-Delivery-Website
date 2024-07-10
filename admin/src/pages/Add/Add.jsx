import {useState} from 'react'
import './Add.css'
import {assets} from './../../assets/assets.js'
import axios from 'axios'
import { toast} from 'react-toastify';
import PropTypes from 'prop-types'


const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;

        setData({...data, [name]:value});
    }

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category" , data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);

        if(response.data.success){
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            })
            setImage(false)
            toast.success(response.data.message);
        }else{
            toast.error("Error occured")
        }
    }


  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image" >
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" hidden required id='image' name='image' />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input type="text" onChange={onChangeHandler} value={data.name} name='name' id='name' placeholder='Type here' required />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" id="description" placeholder='Write content here' rows='6' required></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" id="category">
                        <option value="Salad">Salad</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Sandwich">Sandwich</option>
                    </select>
                </div>

                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name="price" id="price" placeholder='$20' required/>
                </div>
            </div>
            <button type='submit' className="addbutton" >ADD</button>
        </form>
      
    </div>
  )
}

Add.propTypes = {
    url:PropTypes.string.isRequired
}

export default Add
