import React, {useState, useEffect}from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [newRepo, setNewRepo] = useState({})

  useEffect(()=>{
    api.get('repositories').then(response => setRepositories(response.data))
  },[])

  async function handleAddRepository() {
    api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
    .then(response => setRepositories([...repositories, response.data]))
    .catch(error => console.error(error))
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).catch(error => console.error("Erro durante exclusão do projeto: ", id, error))
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>          
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
