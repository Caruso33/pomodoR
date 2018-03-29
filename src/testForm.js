import React, {Component} from 'react';


const TodoItem = ({text}) => (
  <li>{text}</li>
);
class testForm extends Component{
  constructor(props){
    super(props);

    this.state = { todos: [],
                  newTodo: '',
                  newTodoUp: ''
                  };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    this.setState((prevState, props) => ({
      newTodoUp: prevState.newTodoUp.toUpperCase()
    }))
  }
  render(){
    const {newTodo} = this.state;
    const todos = this.state.todos.map((tex, ind) => (
      <TodoItem key={ind} text={tex} />
    ))

    return(
      <div className='todo-app'>
        <h1>Simple todo App</h1>
        <p>{this.state.newTodoUp}</p>

        <form onSubmit={(e) => {
          e.preventDefault(); //no refresh
          const todos = [...this.state.todos, this.state.newTodo];
          this.setState({todos, newTodo: ''})
        }}>

          <input className='todo-input'
            autoComplete='off'
            type='text'
            name='newTodo'//for funct see later
            value={newTodo}
            placeholder='What needs to be done?'
            onChange={(e) => {
              // when having several forms then [target.name] will
              // be nice option for general funct
              this.setState({ [e.target.name]: e.target.value,
                newTodoUp: e.target.value
              })
            }}/>
          <button type='submit'
            className='save-button'
            onClick={this.handleClick}>
            {/* onClick is not meant for submitting the form */}
            Uppercase
          </button>
        </form>
        <div className='todo-content'>
          <ol>
            {todos}
          </ol>
        </div>
      </div>
    );
  }
}

export default testForm;
