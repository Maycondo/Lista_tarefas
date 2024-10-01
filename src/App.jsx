import './App.css'
import  {Component}  from 'react';



export default class App extends Component {
  state = {
    novaTarefa: " ",
    tarefas: [],
    index: -1,
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if(!tarefas) return;
    this.setState({tarefas});
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state
    
    if (tarefas === prevState.tarefas ) return;

     localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }


  handleSubmit = (e) => {
    e.preventDefault();
    
    const { tarefas, index } = this.state;
    let { novaTarefa} = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];
    
    if(index === -1){
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: ""
      });}
      else{
        novasTarefas[index] = novaTarefa;

        this.setState({
          tarefas: novasTarefas,
          index: -1,
        });
      }
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas]
    novasTarefas.splice(index, 1)

    this.setState({
      tarefas: [...novasTarefas],
    });
  }


  render() {
    const { novaTarefa, tarefas } = this.state
    const icon_add = <i className="bi bi-patch-plus-fill"></i>
    const icon_edit = <i class="bi bi-pencil-square"></i>
    const icon_delete = <i class="bi bi-trash-fill"></i>


    return(
      <div className="App">
          <h1>Lista de Tarefas</h1>
        <form onSubmit={this.handleSubmit} action='#' className='form'>
            <input 
            value={novaTarefa}
            onChange={this.handleChange} 
            type="text" 
            placeholder="Digite uma tarefa"/>
            <button type="submit">{icon_add}</button>
        </form>
          <ul className='tarefas'>
            {tarefas.map((tarefa, index )=> (
              <li key={tarefa}>{tarefa}
                <span>
                  <button onClick={(e) => this.handleEdit(e, index)} className='edit'>{icon_edit}</button>
                  <button onClick={(e) => this.handleDelete(e, index)} className='delete'>{icon_delete}</button>
                </span>
              </li>
            ))}
          </ul>
      </div>
    )
  }
}


