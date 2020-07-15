import React, {useState}from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';

import{DELETEITEM} from "./Redux/types"
import AddItemModal from './components/AddItemModal';

function App() {
  let sumTotal = 0
  let promotionApplied =5.90
  const dispatch = useDispatch()

const [showEditItemModal,setShowEditItemModal] =useState(false)
const[item_Edit, setItem_Edit] = useState({})
const items = useSelector (
  state => state.cartItems.items
)
const getItemList= () =>{
  
  let listItems =[]
items.map(item =>{
listItems.push(

  <div className="row" style={{padding:"10px"}} key={item.p_id}>
       <div className="col-6"
       style={{height:"100%" }}>
  
       <div className="row" style={{padding:"10px"}}>
       <img src={require("./Assets/shirt.jpg")}
          style={{height:"200px", width:"150px", }}
       />
       <div style={{}}>
         <div>{item.p_name}</div>
         <div>{"Style #: "}{item.p_style}</div>
         <div>{"Color: "}{item.p_selected_color.name}</div>
         <div className="row">
         <div className="col">
           <span className="col" onClick={()=>toggleEditModal(item)}>EDIT</span>
           <span className="col" onClick={()=>removeItem(item.p_id)}>REMOVE</span>
           <span className="col-8" >SAVE FOR LATER</span>
         </div>
         </div>
       </div>
       </div>
       </div>
       <div className="col" style={{ }}>{item.p_selected_size.name}</div>
       <div className="col" style={{}}>{item.p_quantity}</div>
       <div  className="col" style={{ }}>{item.c_currency}{item.p_price}</div>
     </div>

)
})
return listItems
}
const removeItem =(id) =>{
console.log("reove")
const r_item  = {type:DELETEITEM,payload:{id}}
dispatch(r_item)
}
const toggleEditModal = (item) =>{
  console.log("togglemodal", item)
  setShowEditItemModal(!showEditItemModal)
  if(Object.keys(item).length>0)
  setItem_Edit(item.p_id)
}
const getSumTotal =() =>{
  items.map(item =>{
    sumTotal = sumTotal + (item.p_price* item.p_quantity)
  })
  
  return sumTotal
}


  return (
    <div className="App">
     <div className="row list-group-item-success" 
    //  style={{backgroundColor:"gray"}}
     >
       <div className="col-6"
       style={{}}>
{items.length }{" Items"}
       </div>
       <div className="col" style={{}}>Size</div>
       <div className="col" style={{}}>Quantity</div>
       <div  className="col" style={{ }}>Price</div>
     </div>

     {
       getItemList()
     }
     <div className="row" style={{paddingTop:"20px",width:"100%"}}>
     <div className ="col" >SUB TOTAL</div>
      <div className ="col" style={{float:'right',}}>{getSumTotal()}</div> 
     </div>
      <div className="row" style={{paddingTop:"20px", width:"100%"}}>
     <div className ="col" >PROMO CODE APPLIED</div>
     <div className ="col"  style={{float:'right',}}>{promotionApplied} </div>
     </div>
     <div className="row" style={{paddingTop:"20px", width:"100%"}}>
     <div className ="col" >ESTIMATED TOTAL</div>
     <div className ="col"  style={{float:'right',}}>{sumTotal-promotionApplied} </div>
     </div>
     {
      showEditItemModal && 
      <AddItemModal
        id = {item_Edit}
        close = {()=>toggleEditModal({})}
      />
     }
    </div>
  );
}

export default App;
