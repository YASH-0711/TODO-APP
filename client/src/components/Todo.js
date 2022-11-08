import React, { useState } from 'react'
import todo from "../images/todo.svg";
import "./Todo.css"
const Todo = () => {

  const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
      return JSON.parse(localStorage.getItems('lists'));
    }else{
      return [];
    }
  }

  const [inputData , setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem ,setIsEditItem] = useState(null)

  const addItem = () => {
    if(!inputData) {

    }else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem)=>{
          if(elem.id === isEditItem){
            return {...elem, name:inputData }
          }
          return elem;
        })
      )
      setToggleSubmit(true);

      setInputData('');
  
      setIsEditItem(null)

    }else{
      const allInputData = {id: new Date().getTime().toString(), name:inputData }
      setItems([...items, allInputData]);
      setInputData('')
    }
  }

  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems)
  }


  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id
    });
    console.log(newEditItem)

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id)
  }

  const removeAll = () => {
     setItems([]); 
    }
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src={todo} alt="todologo" />
                <figcaption>Add Your List Here</figcaption>
            </figure>

            <div className='addItems'>
              <input type="text" placeholder='Add Items...' value={inputData} onChange={(e) => setInputData(e.target.value)}/>
               {
                 toggleSubmit ? <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> : 
                 <i className='far fa-edit add-btn' title='Update Item' onClick={addItem}></i>
               }
            </div>

            <div className='showItems'>

              {
                items.map((item , index) => { 
                  return (
                  <div className='eachItem' key={item.id}>
                    <h3>{ item.name }</h3>
                    <div className='todo-btn'>
                        <i className='far fa-edit add-btn' title='Edit Item' onClick={() => editItem(item.id)}></i> 
                        <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(item.id)}></i>
                    </div>
                  </div>
                 )
                })
              }
            </div>

            <div className='showItems'>
              <button className='btns effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
