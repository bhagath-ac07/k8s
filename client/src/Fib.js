import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fethIndexes();
        this.fetchValues();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data});

    }

    async fethIndexes() {
        console.log('fethIndexes');
        const seenIndexes = await axios.get('/api/values/all');
        console.log('fethIndexes');
        this.setState({ seenIndexes: seenIndexes.data});
    }

    handleSubmit = async (event) => {
        console.log(this.state.index);
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: ''});
    }

    renderSeenIndexes() {
        console.log('\n\n\n')
        console.log(this.seenIndexes)
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
        //.map(({number})=> number).join(', ');
    }

    renderCalculatedValues() {
        console.log("Here 0000")
        const entries = [];
        for (let key in this.state.values){
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            )
        }
        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Version 1</h1>
                    <label>Enter your Index</label>
                    <input
                    value={this.state.index}
                    onChange={event => this.setState({index: event.target.value})} />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values</h3>
                {this.renderCalculatedValues()}
            </div>
        )
    }
}

export default Fib;
