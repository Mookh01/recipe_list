# recipe_list
A freeCodeCamp Exercise Building a Recipe Application

# Working Application
https://codepen.io/mookh01/pen/weYBbO

# Objective:
Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/xVXWag/.

User Story: I can create recipes that have names and ingredients.

User Story: I can see an index view where the names of all the recipes are visible.

User Story: I can click into any of those recipes to view it.

User Story: I can edit these recipes.

User Story: I can delete these recipes.

User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.

# Challanges:
There were a number of challanges with this application. Utilizing the react-bootstrap library appropriately, passing stateless functions and handling events.
I learned on this project that you can use the keywords 'require' and 'import' to pass in libraries. Inside codepen, you get your react-bootstrap by passing them in as variables. 

Having watched several videos, most of which were using deprecated code, the way they passed in functions seemed a little confusing. After a little time I got a handle on the difference 
between props and state. Simply put props are passed on from the parent component, state is when creating from within the component. This may not be the best description but from this 
understanding I was able to move my functions from one component to the next. 

Handling events was the biggest learning curve;
		- Panels Remain Open: eventKey={}  technically part of bootstrap but I noticed that using this with the <Accordion>, I was able to keep the Accordion closed, otherwise they all remained open
		- Deleting One Panel Inside a List and the next one opens up:  My solution was to make both the EventKey={} and the key={} unique. 
		- Using a Function in another modal: inside the constructor, I set the function as a state;  
		   
       `this.state={
        edit: this.edit.bind(this),
        remove: this.remove.bind(this)
        }
        edit(){
        }
        remove(){
    }`
