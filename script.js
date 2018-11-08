function getResponse(search) {
  const url = `https://api.github.com/users/${search}/repos` 
  fetch(url)
    .then(res => {      
      if (res.ok) {        
        return res.json()
      }
      throw new Error(res.statusText);
    })
    .then(resJson => {
      Repositories(resJson)
    })
    .catch(() => {
      document.getElementById('errors').innerHTML="Does not exist";
    });
}


function Repositories(repos) {
  let strHtml = '';
  document.getElementById('result-list').innerHTML="";
  for (let i = 0; i < repos.length; i++) {    
    document.getElementById('result-list').innerHTML+=`
      <li class="list-group-item">
        <h3>
          <a href="${repos[i].html_url}">${repos[i].name}</a>
        </h3>     
      </li>`;
  };
  //display the results section  
  document.getElementById('result').classList.remove('hidden');
}


function Result() {
   document.getElementById("userForm").addEventListener("submit", function(event){
    event.preventDefault();
    const search=document.getElementById('inputVal').value;
    document.getElementById('errors').innerHTML="";
    document.getElementById('result').classList.add('hidden');
    
    document.getElementById("userName").innerHTML=search;
getResponse(search);   
});
}
    
    
Result();


