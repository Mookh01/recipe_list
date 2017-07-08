import React, { Component } from 'react';
import {Accordion,Button,ButtonToolbar,Modal,Panel} from 'react-bootstrap';
import './App.css';


//========================= App ====================================
class App extends Component {
constructor(props){
  super(props);

  let recipes = JSON.parse(localStorage.getItem('recipeBox'));
      if(recipes !== null){
        this.state={
          recipes: JSON.parse(localStorage.getItem('recipeBox'))
        }
      } else{
        this.state = {
          recipes: [{ name : "Chocolate Pie", ingredients: ["Chocolate, Gram-crackers"]},
                { name : "Pumpkin Pie", ingredients: ["Pumpkin, Gram-crackers"]},
                { name : "Apple Pie", ingredients: ["Apples, Gram-crackers"]},],

              } // this.state
            } // else
            localStorage.setItem('recipeBox', JSON.stringify(this.state.recipes));

}//constructor

render(){

  return(
     <div className="main">
        <RecipeList recipes={this.state.recipes} />
    </div>

  ) //return
 } //render
}//App
//========================= RecipeList ====================================
class RecipeList extends Component{
  constructor(props){
    super(props);
    this.state={
      edit: this.edit.bind(this),
      remove: this.remove.bind(this),
    } //this.state
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  } //constructor


  add(items){
    let recipe = {name:items.name, ingredients:[items.ingredients]}
    let recipeAddition = this.props.recipes
    recipeAddition.push(recipe);
    this.update(recipeAddition);
    this.setState({showModal: false});
  } //add

  edit(items){
    let recipe = {name:items.name, ingredients:[items.ingredients]}
    let recipeEDIT = this.props.recipes
    recipeEDIT.splice(items.id,1, recipe);
    this.update(recipeEDIT);
  } // edit

  remove(items){
  var recipeDELETE = this.props.recipes;
  recipeDELETE.splice(items,1);
  this.update(recipeDELETE);
} //remove

  update(recipes){
        localStorage.setItem('recipeBox', JSON.stringify(recipes));
        this.setState({showModal: false});
  } //update

  render(){
  let edit = this.state.edit;
  let remove = this.state.remove;
    return(
      <div>
      <h1 className="title"> RECIPE BOX</h1>
      <Accordion >
        { this.props.recipes.map(function(recipe, i){
          return(
            <Panel header={recipe.name}  eventKey={recipe.name+ i + 1} key={recipe.name + i}>
              <IngredientsList id={i} recipe={recipe} edit={edit} remove={remove}/>
            </Panel>

          )
        })}
        <ModalSetup type="new" text="Add Recipe" add={this.add} />
      </Accordion>
      </div>
    ) //return
  } //render
} //RecipeList
//========================= Recipe ====================================
class IngredientsList extends Component{
  constructor(props){
      super(props);
      this.state={

      }
  } //constructor

  render(){
    return(
        <div>
          <h4>Ingredients</h4>
          <ul className="list-group" >
            {this.props.recipe.ingredients.map(function(entry, i){
              return <li className="list-group-item" key={i} > {entry} </li>
            })}
          </ul>
            <ModalSetup type="edit" text="Edit Recipe" id={this.props.id} ingredients={this.props.recipe.ingredients} name={this.props.recipe.name} edit={this.props.edit} remove={this.props.remove}/>
        </div>
    )}
  } //IngredientsList

//========================= ModalSetup ====================================

class ModalSetup extends Component{
  constructor(props){
    super(props);
    if(this.props.type === 'edit'){
      this.state={
        name: this.props.name,
        ingredients: this.props.ingredients.join(", "),
        id: this.props.id
      }
    }
    else {
      this.state={
        name: "",
        ingredients: "",
      }
    }

  } //constructor -----------------------------------------------------

          open(){ this.setState({showModal: true});}  //Shows Modal
          close(){this.setState({showModal: false});} //Closes Modal


          save(){
              let name = this.props.name;
              let ingredients = this.props.ingredients;
            if(this.props.type === "edit"){
              this.props.edit(this.state);
              this.setState({showModal:false, name: this.state.name, ingredients: this.state.ingredients, id:this.props.id});
            }
            else{
              this.props.add(this.state);
              this.setState({showModal:false, name: " ", ingredients: " ", id:this.props.id});
            }
          } //save

          delete(){
            this.props.remove(this.props.id);
          }

          handleChange(e){
            e.preventDefault();
            let title = e.target.title;
            let value = e.target.value;
            if(title === this.state.name){
                this.setState({name: value});
                }
              else{
                this.setState({ingredients: value});
                }
            } //handleChange

  render(){
    return (
       <div>
      <div className="buttons" >
        <ButtonToolbar>
          <Button className="spacer" bsStyle="success" onClick={this.open.bind(this)} > {this.props.text} </Button>
          {this.props.type ==="edit" && <Button  onClick={this.delete.bind(this)}> Delete</Button>}
        </ButtonToolbar>

      </div>

      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header  onClick={this.close.bind(this)} closeButton>
          <Modal.Title>{this.props.text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          <label>Name</label>
          <textarea className="form-control" title={this.state.name} type="text" value={this.state.name} onChange={this.handleChange.bind(this)}/>

        </div>
        <div>
          <label > Ingredients </label>
          <textarea className="form-control" id="ingredients" type="text" value={this.state.ingredients} onChange={this.handleChange.bind(this)}/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button  bsStyle="success"  onClick={this.save.bind(this)} >Save</Button>
          <Button onClick={this.close.bind(this)} >Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    ) //return
  } //render
} //ModalSetup

export default App;
