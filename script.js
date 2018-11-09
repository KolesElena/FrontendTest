getResponse =(search) => {
  const url = `https://api.github.com/users/${search}/repos` 
  fetch(url)
    .then(res => {      
      if (res.ok) {        
        return res.json()
      }
      throw new Error(res.statusText);
    })
    .then(resJson => {
      Repositories(resJson);
    })
    .catch(() => {
      const er=document.getElementById('errors');
      er.classList.remove("hidden");
      er.innerHTML="Does not exist";
    });
}


Repositories =(repos) => {
  let strHtml = '';
  document.getElementById('result-list').innerHTML="";
  for (let i = 0; i < repos.length; i++) {    
    document.getElementById('result-list').innerHTML+=`
      <li class="list-group-item">
        <h3>
          <a href="${repos[i].html_url}">${repos[i].name}</a>
<span><svg aria-label="star" class="octicon octicon-star" viewBox="0 0 14 16" version="1.1"
 width="14" height="16" role="img"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
        ${repos[i].stargazers_count}</span>
<span><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1"
 width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 
3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 
0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
        ${repos[i].forks_count}</span>
        </h3>     
      </li>`;
  };
  //display the results section  
  document.getElementById('result').classList.remove('hidden');
}


Result =() => {
   document.getElementById("userForm").addEventListener("submit", function(event){
    event.preventDefault();
    const search=document.getElementById('inputVal').value;
    const usuario = `https://api.github.com/users/${search}/repos`;
    document.getElementById('errors').classList.add("hidden");
    document.getElementById('result').classList.add('hidden');
    
    document.getElementById("userName").innerHTML=`<div class="userData"><p class="username">@${search}</p>
    <h2>Full name</h2>
    <p class="bio">this is the bio...</p></div>
`;
getResponse(search);   
});
}
    
    
Result();


