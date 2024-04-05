import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function TodoApp(){
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [showFinished, setshowFinished] = useState(true)
    
    useEffect(() => {
      let todoListData = localStorage.getItem('todoList')
      if (todoListData) {
        let todos = JSON.parse(todoListData)
        setTodoList(todos)
      }
    }, [])
    

    function saveToLocalStorage(){
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }

    function handleChange(event){
        setTodo(event.target.value)
    }

    function handleAdd(){
        setTodoList(
            [...todoList, {id: uuidv4(), todo, isCompleted: false}]
        )
        setTodo('')
        saveToLocalStorage();
    }

    function toggleFinished(){
        setshowFinished(!showFinished)
    }

    function handleCheckbox(event){
        let id = event.target.name;
        let index = todoList.findIndex(item =>{
            return item.id == id
        })
        let newTodos = [...todoList];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodoList(newTodos)
        saveToLocalStorage()
    }

    function handleEdit(id){
       let todo = todoList.filter(item=> item.id === id);
       setTodo(todo[0].todo);
       let newTodos = todoList.filter(item=> {
        return item.id !== id
       })
       setTodoList(newTodos)
       saveToLocalStorage()
    }

    function handleDelete(id){
       let newTodos = todoList.filter(item=> {
        return item.id !== id
       })
       setTodoList(newTodos)
       saveToLocalStorage()
    }

    return(
        <main className="w-full h-[100vh] bg-zinc-500 px-36 py-8">

            {/* Todo input section */}

            <section className="todoInput flex justify-between">
                <input
                    className="w-[86%] h-10 px-4 rounded-lg outline-none shadow-md" 
                    type="text"
                    value={todo}
                    onChange={handleChange}
                />
                <button 
                    className="h-10 rounded-lg px-4 text-white bg-blue-500 shadow-xl"
                    onClick={handleAdd}
                >
                    Create Todo
                </button>
            </section>



            {/* TodoList preview section */}

            <section className="todoList w-full h-[75%] bg-white px-10 py-2 my-8 rounded-lg shadow-xl overflow-y-scroll">

                <header className="flex items-center px-4 gap-2">
                    <input
                        className="w-4 h-4 mt-3"
                        type="checkbox"
                        name=""
                        id="done"
                        onChange={toggleFinished}
                        value={showFinished}
                    />
                    <label htmlFor="done" className="mt-3 ">Show Finished</label>
                    <h1 className="text-2xl mx-[200px] ">Your Todolist</h1>
                </header>

                <hr className="bg-slate-200 mt-4 w-full h-[2px] " />

                {todoList.length === 0 && <div className='m-5'>No Todos to display</div>}


                {
                    todoList.map(item => {
                    
                        return (showFinished || item.isCompleted) && 
                            (
                                <div key={item.id} className="flex gap-3 my-5 h-10 justify-between">
                                    
                                    <div className="flex justify-between px-3 rounded-md shadow-md items-center w-[85%] h-10">

                                        <input 
                                            className="w-5 h-10"
                                            type="checkbox"
                                            checked={item.isCompleted}
                                            onChange={handleCheckbox}
                                            name={item.id}
                                        />

                                        <div className={item.isCompleted?"w-[95%] line-through": "w-[95%]"}>{item.todo}</div>

                                    </div>
                                    
                                    <div className="flex gap-3 items-center ">

                                        <button
                                            className="h-full bg-green-400 px-4 rounded-md shadow-lg"
                                            onClick={()=> handleEdit(item.id)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="h-full bg-red-400 px-4 rounded-md shadow-lg"
                                            onClick={()=> handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                        
                                    </div>

                                </div>
                            )
                    })
                }

            </section>

        </main>
    )
}

export default TodoApp;