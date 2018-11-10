const getResponse =(search) => {
  const repositoriesUrl = `https://api.github.com/users/${search}/repos`;
  const userDataUrl = `https://api.github.com/users/${search}`;

  const repos = fetch(repositoriesUrl).then(res => res.json());
  const userData = fetch(userDataUrl).then(res => res.json()).catch(() => {
                const er = document.getElementById('errors');
                er.classList.remove("hidden");
                er.innerHTML="Does not exist";
                document.getElementById("userBox").classList.add("hidden");
                document.getElementById("result").classList.add("hidden");
            });
  
  return Promise.all([repos, userData]);
};

const showRepos =(repos) => repos.reduce((acc, repo) => {
    return acc += `
      <li class="list-group-item">
        <h3>
          <a href="${repo.html_url}">${repo.name}
<span><svg aria-label="star" class="octicon octicon-star" viewBox="0 0 14 16" version="1.1"
 width="14" height="16" role="img"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
        ${repo.stargazers_count}</span>
<span><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1"
 width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 
3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 
0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
        ${repo.forks_count}</span>
        </a></h3>     
      </li>`;
}, '');

const showUserData = (user) => {
    let bio=user.bio;
    
    if (user.bio===null) {
       bio="This user does not have bio.";
    }
    else {
      bio=user.bio;
    }
    
      return  `
        <div><img src=${user.avatar_url} width="150" height="150"/></div>
        <div id="userData">
         <h4 class="font-italic">@${user.login}</h4><br>
         <h2>${user.name}</h2><br>
         <p>${bio}</p></div>
      `;   
};

const Result =() => {
    document.getElementById("userForm").addEventListener("submit", function(event){
        event.preventDefault();
        document.getElementById('result-list').innerHTML = "";
        const search = document.getElementById('inputVal').value;

        // Get user info
        const repos = getResponse(search)
            .then(results => {
                const resultElement = document.getElementById('result');
                const resultListElement = document.getElementById('result-list');
                const userDataElement = document.getElementById('userBox');

                const repos = results[0];
                const userData = results[1];

                document.getElementById('errors').classList.add("hidden");
                resultElement.classList.remove("hidden");
                userDataElement.classList.remove("hidden");
                

                userDataElement.innerHTML = showUserData(userData);
                resultListElement.innerHTML = showRepos(repos);
            })
            .catch(() => {
                const er = document.getElementById('errors');
                er.classList.remove("hidden");
                er.innerHTML="Does not exist";
                document.getElementById("userBox").classList.add("hidden");
                document.getElementById("result").classList.add("hidden");
            });     
    });
};
 
Result();


