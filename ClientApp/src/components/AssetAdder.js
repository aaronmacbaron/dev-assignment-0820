import React, { Component } from 'react';

export class AssetAdder extends Component {

    constructor(props){
        super(props);
        this.state = {
            pending : {
                name     : '',
                price    : 0,
                category : 'electronics'
            }
        };
        
    }
    handleSubmit = () => {
        let pending = this.state.pending;
        this.props.addItemToCategory(pending.category,pending.name,pending.price);
    }

    handleChange = (event) => {
        let value = event.target.value;
        let field = event.target.name;
        let pending = Object.assign({},this.state.pending);

        pending[field] = value;
        this.setState({pending});
    }
    render () {

        return (
            <div>
            <input placeholder="Item Name" type="text" value={this.state.pending.name} name="name" onChange={this.handleChange} />
            <input type="number" min="0" step="1" value={this.state.pending.price} name="price" onChange={this.handleChange} />
            <select name="category" value={this.state.pending.category} onChange={this.handleChange}>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="kitchen">Kitchen</option>
            </select>
            <input type="button" value="Add" onClick={this.handleSubmit.bind(this)}/>
        </div>
        )
    }

}

export default AssetAdder;