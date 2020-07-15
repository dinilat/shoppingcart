import {EDITITEM, DELETEITEM} from '../types'
import cartData from '../../data.json'
import {cloneDeep} from 'lodash'
const initialState = {items:cartData}
export default function(state=initialState, action){
    const cartItemDelete = (state,action) =>{
let newArray = state.items.filter(item=>  item.p_id!==action.payload.id)
return { ...state,items:newArray }
    }
    const cartItemEdit = (state,action) =>{
        let newArray= cloneDeep(state.items)
        let quantity
        const {id,editType} = action.payload
    
        newArray.map((item,i)=>{
    if(item.p_id === id)
    {
        
        switch(editType){
            case "ADD_QUANTITY" :
                quantity = item.p_quantity+1
                break
                case "MINUS_QUANTITY" :
                    if(item.p_quantity>0)
                quantity = item.p_quantity-1
                else
                quantity = item.p_quantity
                    break
    }
    
console.log("newArray[i]",newArray[i])
newArray[i].p_quantity =quantity
console.log("newArray[i]",newArray[i])
}

})
          
return {...state,items:newArray} 

    }
    switch (action.type){
        case EDITITEM:
            return cartItemEdit(state,action);
        case DELETEITEM:
            return cartItemDelete(state,action);
           
        default: 
            return state
    }
}