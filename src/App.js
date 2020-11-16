import './App.css';
import cuid from 'cuid'
import { BrowserRouter as Router, Route, Switch, NavLink, useParams} from "react-router-dom";
import AppHeader from './components/AppHeader'
import { useEffect, useState } from 'react';
import {getLocal,setLocal,updateLocal,deleteLocal} from './Storage'

function App() {

  const [status, setStatus] = useState("normal")
  const [validate, setValidate] = useState()
  const [list, setList] = useState([])
  const [newItem, setNewItem] = useState({
    name: "unknown",
    author: "unknown",
    shop: "unknown" 
})

  // useEffect runs to check LocalStorage & Updated items
  useEffect(()=>{
    if (getLocal()){
      setList([getLocal()])
    }
    return () =>{
      setStatus("normal")
    }
},[status])

  // NewItemView component to add a new Cardgame into list
  function NewItemView(){
    return (
      <div>
        <h2 className="addNew">Add new Card Game</h2>
        <div>
            <form  className="newItem">
              <div className="newItemInfo">
              <div className="newInput">
                <span class="material-icons md-36">videogame_asset</span>
                <input type="text" name="newItemName" placeholder="Name" id="name"></input>
              </div>
              <div className="newInput">
                <span class="material-icons md-36">copyright</span>
                <input type="text" name="newItemAuthor" placeholder="Author" id="author"></input>
              </div>
              <div className="newInput">
                <span class="material-icons md-36">http</span>
                <input type="text" name="newItemShop" placeholder="Website" id="shop"></input>
              </div>

                {/* Show div if one of the 3 inputs was not filled */}
                {validate ? (<div className="validate">All field must be filled</div>) : null}
              </div>
                
            <div className="newItemSettings">
                <NavLink to="/">
                    <button onClick={createNewItem} className="newItemSave" type="submit">Save</button>
                </NavLink>
                <NavLink to="/">
                    <button className="newItemCancel">Cancel</button>
                </NavLink>
            </div>
            </form>
        </div>
      </div>
    )
  }

  // Create a new Cardgame li element
  function createNewItem(ev){
    let name = document.getElementById("name").value
    let author = document.getElementById("author").value
    let shop = document.getElementById("shop").value

    // Check if all 3 inputs are filled
    if (name === "" || author === "" || shop === "") {
      setValidate("bad")
      ev.preventDefault()
    } else {
      setValidate()
      let obj = {
        id: list.length,
        cuid: cuid(),
        name: name,
        author: author,
        shop: shop
      }

      setNewItem(obj)
      setLocal(obj)
      setList([...list, obj])
    }

}

// Remove selected item & update LocalStorage
function removeItem(ev){
  let cuid = ev.target.getAttribute("cuid")
  let filteredList = list.flat().filter(function(item){
    return (item.cuid!==cuid)
  })
  setList(filteredList)
  deleteLocal(filteredList)
}

// Show Edit view of selected item
function Edit(){
  const { cuid } = useParams()
  let selectedItem 

  selectedItem = list.flat().filter(i => i.cuid === cuid)

  if (!selectedItem) return null

  // Update the item info
  function updateItem(){

      let newName = document.getElementById("name").value
      let newAuthor = document.getElementById("author").value
      let newShop = document.getElementById("shop").value

      // Check for updated content
      if (newName !== selectedItem[0].name && newName !== ""){
          selectedItem[0].name = newName
      }
      if (newAuthor !== selectedItem[0].author && newAuthor !== ""){
          selectedItem[0].author = newAuthor
      }
      if (newShop !== selectedItem[0].shop && newShop !== ""){
          selectedItem[0].shop = newShop
      }
      let obj = {
          cuid: selectedItem[0].cuid,
          name: selectedItem[0].name,
          author: selectedItem[0].author,
          shop: selectedItem[0].shop
      }
      updateLocal(obj)
      // set Status to update edited item from LocalStorage
      setStatus("update")
  }

  return (
      <aside>
        {selectedItem &&
          selectedItem.map(item => (
              <div className="item2" key={item.cuid} id={item.id} cuid={item.cuid}>
                  <div className="itemInfo">
                    <div className="updateInput">
                      <div className="itemEditInfo">Name</div>
                      <input type="text" name="newItemName" placeholder={item.name} id="name" ></input>
                    </div>
                    <div className="updateInput">
                      <div className="itemEditInfo">Author</div>
                      <input type="text" name="newItemAuthor" placeholder={item.author} id="author" ></input>
                    </div>
                    <div className="updateInput">
                      <div className="itemEditInfo">Website to buy</div>
                      <input type="text" name="newItemShop" placeholder={item.shop} id="shop" ></input>
                    </div>
                  </div>
                  <div className="itemSettings">
                  <NavLink to="/">
                  <button onClick={updateItem} className="itemEdit">Save</button>
                  </NavLink>
                  <NavLink to="/">
                  <button className="itemCancel">Cancel</button>
                  </NavLink>
                  </div>
              </div>
          ))}
      </aside>
    )
}

function ListView(){
  return(
    <ul className="ul">
        {list.flat().map(item=>(
        <li className="item" key={item.cuid} id={item.id} cuid={item.cuid}>
            
            <div className="itemInfo">
              <div className="itemName">{item.name}</div>
              <div className="itemInfo2">
                <div className="author">by {item.author}</div>
                <a className="itemShop" href={item.shop} rel="noreferrer" target="_blank">Buy it</a>
              </div>
            </div>
            <div className="itemSettings">
            <NavLink to={"/edit/"+item.cuid}>
            <button className="itemEdit">Edit</button>
            </NavLink>
            <NavLink to="/">
            <button onClick={removeItem} cuid={item.cuid} className="itemRemove">Remove</button>
            </NavLink>
            </div>
        </li>
        ))}
    </ul>
  )
}

  return (
    <Router>
      <div className="App">
          <AppHeader/>
          <main>
            <Switch>
                <Route path="/edit/:cuid">
                  <h2 className="addNew">Edit</h2>
                  <Edit list={list}/>
                </Route>

                <Route path="/new-item">
                  <NewItemView/>
                </Route>
                
                <Route path="/">
                  <ListView/>
                </Route>
            </Switch>
          </main>
      </div>
    </Router>
  );
}

export default App;
