import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
                className="checkbox"
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
                onClick={() => modifyStatus(todo)}
              ></button>
              <button></button>
              <p>
                {/* {todo.id}  */}
                {todo.name}
              </p>
              <button onClick={() => handleEditTodo(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"} />
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  }

  async function handleInputVisibility() {
    setinputVisibility((visible) => !visible);
  }

  async function createTodo() {
    await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    handleInputVisibility();
    setInputValue("");
  }

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    getTodos();
  }

  async function modifyStatus(todo) {
    await axios.put(`http://localhost:3333/todos/`, {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function handleEditTodo(todo) {
    setSelectedTodo(todo);
    setInputValue(todo.name);
    setinputVisibility(true);
  }

  async function editTodo() {
    await axios.put(`http://localhost:3333/todos/`, {
      id: selectedTodo.id,
      name: inputValue,
    });
    setinputVisibility(false);
    setInputValue('')
    setSelectedTodo();
    getTodos();
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setinputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Don't be lazyy</h1>
        </div>

        <Todos todos={todos}></Todos>

        <input
          style={{ display: inputVisibility ? "block" : "none" }}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          className="inputName"
        ></input>
        <button
          onClick={
            inputValue
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleInputVisibility
          }
          className="newTaskButton"
        >
          {inputVisibility
            ? inputValue
              ? selectedTodo
                ? "Editar"
                : "Criar Task"
              : "Fechar"
            : "+"}
        </button>
      </header>
    </div>
  );
}

export default App;
