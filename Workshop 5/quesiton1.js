function getRepos() {
    const username = document.getElementById("username").value;
    const url = `https://api.github.com/users/${username}/repos`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const repoList = document.getElementById("repo-list");
        repoList.innerHTML = "";
        
        data.forEach(repo => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = repo.html_url;
          link.textContent = repo.name;
          listItem.appendChild(link);
          repoList.appendChild(listItem);
        });
      })
      .catch(error => console.error(error));
  }