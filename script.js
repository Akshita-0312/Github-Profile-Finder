let SearchBtn = document.querySelector(".search-btn");
let profileContent = document.querySelector(".profile-content");


SearchBtn.addEventListener("click",()=>{
  let SearchValue = document.querySelector(".input-search").value;
  if(SearchValue === ""){
    alert("Please enter a username");
    return;
  }
  fetch(`https://api.github.com/users/${SearchValue}`)
  .then(response => response.json())
  .then(data=>{
      if(data.message === "Not Found"){
        alert("User not found");
        return;
      }
     profileContent.innerHTML = `
     <div class="content">
       <div class="profile-detail">
          <div class="left">
            <img class="profile-img" src = "${data.avatar_url}" alt = "Profile Pictures"> 
            <div class="profile-data">
               <p class="name">${data.name || "No Name Available"}</p>
               <p class="login_id">@${data.login}</p>
               <p class="location"><i class="ri-map-pin-line"></i>${data.location}</p>
            </div>   
          </div>
          <div class="right">
            <div class="visit-link">
             <a href="${data.html_url}">Visit Profile</a>
            </div>
        </div>
       </div>
       <div class="bio">
            <p class="about">${data.bio}</p>
       </div>
       <div class="followers-detail">
               <div class="followers">
               <h3>Followers</h3>
               <p>${data.followers}</p>
               </div>

               <div class="following">
               <h3>Following</h3>
               <p>${data.following}</p>
               </div>

               <div class="repositories">
               <h3>Repositories</h3>
               <p>${data.public_repos}</p>
               </div>
       </div>
       <div class="repo">
                <h3>Repositories</h3>
                <ul class="repo-list"></ul>
       </div>
      </div>
     `
     fetch(`https://api.github.com/users/${SearchValue}/repos`)
     .then(response => response.json())
     .then(repos => {
       let repoList = document.querySelector(".repo-list");
       repoList.innerHTML = repos.map(
         repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
       ).join("");
     })
     .catch(() => {
       document.querySelector(".repo-list").innerHTML = "<li>Error Fetching Repositories</li>";
     });
   })
   .catch((error) => {
     profileContent.innerHTML = "<h2>Error Fetching Data</h2>";
   });
   
});