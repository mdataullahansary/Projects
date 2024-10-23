function getUserData() {
    const username = document.getElementById('username').value;
    console.log(username);
    

    const requestUrl = `https://api.github.com/users/${username}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(this.responseText);
                console.log(data);
                document.getElementById('img').style.backgroundImage = `url(${data.avatar_url})`;
                document.querySelector('#Name').innerHTML = `Name: ${data.name}`;
                document.querySelector('#Bio').innerHTML = `Bio: ${data.bio}`;
                document.querySelector('#followers').innerHTML = `Followers: ${data.followers}`;
                document.querySelector('#Repo').innerHTML = `Repo: ${data.public_repos}`;
                document.getElementById('userInfo').style.display = `Block`;
            } else {
                alert("User not found or error in fetching data.");
            }
        }
    };
    xhr.send();
}
