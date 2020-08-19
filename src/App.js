import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function getRepositories() {
    const response = await api.get('/repositories');

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const params = {
      title: "matheusleandroo",
      url: "https://github.com/matheusleandroo/matheusleandroo",
      techs: [
        "HTML",
        "CSS"
      ]
    };

    const response = await api.post('repositories', params);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(res => {
      const newRepositories = repositories.filter(repository => repository.id !== id);

      setRepositories(newRepositories);
    })
  }

  useEffect(() => {
    getRepositories();
  }, [])

  return (
    <div>
      <h1>Repositórios</h1>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
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
