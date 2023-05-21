// work flow

// fetch users from API
//store those user in global array
// display user in the ui

let userlist = [];
const apiEp = "https://randomuser.me/api?";

const countElm = document.getElementById("count");

const displayElm = document.getElementById("list");

// const fetchUsers = () => {

// promise
//   const user = fetch(apiEp);
//   console.log(user);

//   fetch(apiEp)
//     .then((response) => {
//       // console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       userlist = data.results;
//       console.log(data);
//     });
//   // ,catch(error)=>{
//   // console.log(error)     }
// };

// async/await

// try {
//   const response = await fetch(apiEp);
//   const data = await response.json();
//   userlist = data.results;
//   console.log(data.results);
// } catch (error) {
//   console.log(error);
// }
//
const fetchUsers = async (path = "results=20") => {
  const response = await fetch(apiEp + path);
  const data = await response.json();
  userlist = data.results;
  console.log(data.results);
  displayUser(userlist);
};
fetchUsers();

const displayUser = (displayArg) => {
  let str = "";
  displayArg.forEach((user) => {
    str += `
    <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
  <img  src="${user?.picture?.large}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${user?.name?.title} ${user?.name?.first} ${user?.name?.last}</h5>
    <h6 class="email"><i class="fa-solid fa-envelope"></i> ${user.email}</h3>
    <h6 class="full address"><i class="fa-solid fa-address-book"></i>${user?.location?.street.number},${user?.location?.street.name} ,${user?.location?.city},${user?.location?.state},${user?.location?.country}</h6>
    <a href="tel:${user?.phone}">
    <div class= "d-grid">
    <button class="btn btn-primary"><i class="fa-solid fa-phone"></i> ${user.phone}</button>
  </div></div></a>
</div>`;
  });
  displayElm.innerHTML = str;
  countElm.innerText = displayArg.length;
};

document.getElementById("select").addEventListener("change", (e) => {
  const { value } = e.target;
  //   console.log(e.target.value);
  const path = `results=20&gender=` + value;
  fetchUsers(path);
});

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const { value } = e.target;
  // console.log(e.target.value);

  //run filter method

  const filterUser = userlist.filter((item) => {
    // console.log(item)
    const fullName = (item.name.first + " " + item.name.last).toLowerCase();

    return fullName.includes(value.toLowerCase());
  });

  //display function
  displayUser(filterUser);
});
