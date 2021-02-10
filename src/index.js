import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AddButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onAdd}> + </button>
        )
    }
}

class RemoveButton extends React.Component {
    render() {
        return (
            <button class="remove" onClick={() => this.props.onRemove(this.props.stepNum)}> - </button>
        )
    }
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    handleInput(e) {
        this.setState({
            value: e.target.value,
        });
    }
    
    render() {
        const isEnabled = this.state.value.length > 0;
        return (
            <div className="popup" id="popup">
                <div className="popup-content" popup-close="true">
                    <h1>Add Item</h1>
                    <input type="text" onChange={(e) => this.handleInput(e)} />
                    <button onClick={this.props.closePopup}>Cancel</button>
                    <button onClick={() => this.props.addContent(this.state.value)} disabled={!isEnabled}>Add</button>
                </div>
            </div>
        )
    }
}

class Item extends React.Component {
    render() {
        return (
            <div className="item">
                <RemoveButton onRemove={this.props.onRemove} stepNum={this.props.stepNum} />
                {this.props.name}
            </div>
        );
    }
}

class Items extends React.Component {
    render() {
        const current = this.props.items.slice();
        const items = current.map((item, stepNum) => {
            return (
                <Item name={item.name} stepNum={stepNum} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
            );
        });
        return (
            <div className="items">{items}</div>
        );
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showPopup: false,
        }
    }

    showPopup() {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    }

    addContent(value) {
        const items = this.state.items.slice();
        this.setState({
            items: items.concat([{
                name: value,
            }]),
            warning: null,
        });
        this.showPopup();
    }

    onRemove(step) {
        const items = this.state.items.slice();
        items.splice(step, 1);
        this.setState({
            items: items,
        });
    }

    setWarning(warning) {
        this.setState({
            warning: warning
        });
    }

    containerClick(e) {
        const parent = e.target.parentNode;
        if (parent.hasAttribute('popup-close') || e.target.hasAttribute('popup-close')) return;
        this.showPopup();
    }

    render() {
        const currentItems = this.state.items.slice();

        return (
            <div className="container" onClick={(e) => this.containerClick(e)}>
                <div className="title">
                    <h1>To-do List</h1>
                </div>
                <Items 
                    items={currentItems}
                    onAdd={() => this.showPopup()}
                    onRemove={(step) => this.onRemove(step)}
                />
                <AddButton onAdd={() => this.showPopup()}/>
                {
                    this.state.showPopup ? <Popup closePopup={() => this.showPopup()} addContent={(value) => this.addContent(value)} onWarning={(warning) => this.setWarning(warning)}/> : null
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('root')
)