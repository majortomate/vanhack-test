import React, { useState } from "react";
import {checkPositiveColumn, checkNegativeColumn} from '../services/services.js';

const AssemblyLine = ({stages}) =>{
  
  const [stagesState, setStagesState] = useState(stages)
  const [newItem, setNewItem] = useState([])
  const [inputText, setInputText] = useState("")
  
  const changeHandler = (e) => {
    setInputText(e.target.value)
  }

  const enterHandler = (e) =>{
      if (e.key === 'Enter') {
          const newItems = [{"value":  inputText, "column":0}, ...newItem]
          setNewItem(newItems)
          setInputText("")
        }
      }

  const clickHandler = (e) =>{
    if (e.type === "click") {
        const addedItems = [...newItem]
        const toMove = addedItems.find(item => item === addedItems[e.currentTarget.id])
        const newItems = addedItems.filter(item => item !== addedItems[e.currentTarget.id])
        setNewItem([{...toMove, column: checkPositiveColumn(toMove.column)}, ...newItems])
      
    } else if (e.type === "contextmenu") {
        e.preventDefault()
        const addedItems = [...newItem]
        const toMove = addedItems.find(item => item === addedItems[e.currentTarget.id])
        const newItems = addedItems.filter(item => item !== addedItems[e.currentTarget.id])
        setNewItem([...newItems, {...toMove, column: checkNegativeColumn(toMove.column)}])
    }
  }
  
  return (
    <div className="container">
      <div className="assembly-input">
        <label>Add an item: </label>
        <input type="text" className="assembly-add-item" onKeyPress={enterHandler} onChange={changeHandler} value={inputText} />
      </div>
      <hr></hr>
      <div className='assembly-stages'>
          {stagesState.map((stage, index) => (
        <div  key={index} className='assembly-stage'>
          <h5>{stage}</h5>
            {
             newItem.map((item, indexItem) => (
                 item.column === index &&
              <button 
              className="assembly-item"
              onClick={clickHandler}
              onContextMenu={clickHandler}
              key={indexItem}
              id={indexItem}>
                {item.value}
              </button> 
            ))
            }        
        </div>
        ))}
      </div>
    </div>
  )
 }


export default AssemblyLine;
