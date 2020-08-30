import React, { Component } from 'react';
import AssetAdder from './AssetAdder';
import { FaTrash } from 'react-icons/fa';
import './InsurableContents.css';


export class InsurableContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            electronics : {
                      total : 2000, 
                      items : [{
                          "name"  : "TV",
                          "price" : 2000
                        }]        
            },
            clothing : {
                total : 0,
                items : []
            },
            kitchen : {
                total : 0,
                items : []
            }
        };
        this.addItemToCategory = this.addItemToCategory.bind(this);
    }

    componentDidMount() {
        let stored_data = JSON.parse(localStorage.getItem('insurable-contents'));
        console.log(stored_data);
        this.getData();
    }

    async getData() {
        const response = await fetch('datapersistence');
        const data = await response.json();
        console.log(data);
     }
    /**All changes to setState goes through this so that I can fire off a save whenever this is called. */
    stateHandler = ( state ) => {
        this.setState({
            state
        });
        localStorage.setItem('insurable-contents',JSON.stringify(Object.assign({},this.state)));

    }
    getTotal = () =>  this.state.electronics.total + this.state.clothing.total + this.state.kitchen.total;

    addItemToCategory = (category, name, price) => {

        switch(category){
            case "electronics":
                let electronics = Object.assign({},this.state.electronics);
                electronics.items.push({"name":name,"price":parseInt(price)});
                electronics = this.recalculateTotals(electronics);
                this.stateHandler(electronics);
                break;
            case "clothing":
                let clothing = Object.assign({},this.state.clothing);
                clothing.items.push({"name":name,"price":parseInt(price)});
                clothing = this.recalculateTotals(clothing);
                this.stateHandler(clothing);
                break;
            case "kitchen":
                let kitchen = Object.assign({},this.state.kitchen);
                kitchen.items.push({"name":name,"price":parseInt(price)});
                kitchen = this.recalculateTotals(kitchen);
                this.stateHandler(kitchen);
                break;
            default:
                break;
        }
    }

    recalculateTotals = (object) => {
        let newTotal = 0;
                
        for(let i = 0; i < object.items.length; i++){
            newTotal += parseInt(object.items[i].price);
        }

        object.total = newTotal;
        return object
    }
    
    removeItem = (category, index) => {
        switch(category){
            case "electronics":
                let electronics = Object.assign({}, this.state.electronics);
                electronics.items.splice(index,1);
                electronics = this.recalculateTotals(electronics);
                this.stateHandler(electronics);
                break;
            case "clothing":
                let clothing = Object.assign({}, this.state.clothing);
                clothing.items.splice(index,1);
                clothing = this.recalculateTotals(clothing);
                this.stateHandler(clothing);
                break;
            case "kitchen":
                let kitchen = Object.assign({}, this.state.kitchen);
                kitchen.items.splice(index,1);
                kitchen = this.recalculateTotals(kitchen);
                this.stateHandler(kitchen);
                break;
            default:
                break;
        }
    }


    render() {
        let electronics = this.state.electronics;
        let clothing = this.state.clothing;
        let kitchen = this.state.kitchen;

        return (
            <div className="app-container">
                <h3>Electronics (${electronics.total})</h3>
                <ul>
                    {electronics.items.map((v,i) => {
                        return(
                            <li key={i}>
                                {v.name}
                                <span className="price">(${v.price})</span>
                                <span className="link" onClick={this.removeItem.bind(this,'electronics',i)}><FaTrash /></span>
                            </li>
                        )
                    })}
                </ul>
                <h3>Clothing (${clothing.total})</h3>
                <ul>
                    {clothing.items.map((v,i) => {
                        return(
                            <li key={i}>
                                {v.name}
                                <span class="price">(${v.price})</span>
                                <span class="link" onClick={this.removeItem.bind(this,'clothing',i)}><FaTrash /></span>
                            </li>
                        )
                    })}
                </ul>
                <h3>Kitchen (${kitchen.total})</h3>
                <ul>
                    {kitchen.items.map((v,i) => {
                        return(
                            <li key={i}>
                                {v.name}
                                <span class="price">(${v.price})</span>
                                <span class="link" onClick={this.removeItem.bind(this,'kitchen',i)}><FaTrash /></span>
                            </li>
                        )
                    })}
                </ul>
                <br />
                <h3>TOTAL ${this.getTotal()}</h3>

                <AssetAdder addItemToCategory={this.addItemToCategory}/>

            </div>
        );
    }

}