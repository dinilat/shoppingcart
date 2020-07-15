import React, {useState, useEffect}from 'react';
import Modal from 'react-modal';
import {useSelector,useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSortUp,faSortDown } from '@fortawesome/free-solid-svg-icons'
import {EDITITEM} from '../Redux/types'



const AddItemModal = (props) =>{
    const dispatch  = useDispatch()
const [selectedItem,setSelectedItem] =useState({})
    const items = useSelector (
        state => state.cartItems.items
      )
      useEffect(()=>{
          console.log("ffff", props.id)
        items.map(item=>{
            if(item.p_id===props.id)
            setSelectedItem (item)
        })
        
      },[items])
const incQty = () =>{
    console.log("add")
    dispatch({type:EDITITEM, payload:{id:props.id,editType:"ADD_QUANTITY" }})
   
}
const decQty = () =>{
    console.log("minus")
    dispatch({type:EDITITEM, payload:{id:props.id,editType:"MINUS_QUANTITY" }})

}
    return(
        
        <div >
<Modal
          isOpen={true}
          contentLabel="Example Modal"
          style={styles}
        >
            {selectedItem && 
                <div className="row">
            <div className="col-6">
            <div>{selectedItem.p_name}</div>
        <div><span>{selectedItem.c_currency}{selectedItem.p_price}</span></div>
        <span>{selectedItem.p_style}</span>
            <div  style={{paddingVertical:"10px",
            border: "1px solid #0000FF", 
    width:"50px"}}>
    <div className='input-group ' style={{}}>
<div style={{paddingRight:"10px"}}> {selectedItem.p_quantity}</div>
<div style={{float:"right", alignItems:"right", justifyContent:"right"}}>

<FontAwesomeIcon icon={faSortUp} onClick={()=>incQty()}  />
<FontAwesomeIcon icon={faSortDown} onClick={()=>decQty()} style={{alignSelf:"right"}}/>
{/* <i className="fas fa-sort-up"></i> */}
</div>
</div>
</div>
            <div className='button' onClick={()=>props.close()}
            style={{backgroundColor:'blue',marginTop:"10px", alignSelf:"center"}}>Add</div>

            </div>
           
            <div className='col-6'>
            <img src={require("../../src/Assets/shirt.jpg")}
          style={{height:"200px", width:"150px", }}
       />
            </div>
            </div>
           
            
            }
        </Modal>
        </div>
        

    )
}
export default AddItemModal
const styles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
}