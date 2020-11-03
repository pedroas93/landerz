const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_USERS = 'https://jsonplaceholder.typicode.com/users';

let post = document.getElementById('myslider')
let nameUser = document.getElementById("nameUser");


const getPosts = async (id) => {
    const apiURLPost = API_POSTS;
    const apiURLUser = API_USERS;
    try {
        const responsePost = await fetch(apiURLPost);
        const postResponse = await responsePost.json();

        const responseUser = await fetch(apiURLUser);
        const userResponse = await responseUser.json();

        let objectcollectionUser = {}
        objectcollectionUser = { ...objectcollectionUser, ...userResponse }

        postResponse.forEach(element => {
            let tag = document.createElement("p");
            let text = document.createTextNode("\"" + element.title + "\"");
            tag.appendChild(text);
            // tag.style.paddingLeft = "1em"
            post.appendChild(tag);
            
            userResponse.forEach(elementUser => {
                if (element.userId === elementUser.id) {
                    let tagUser = document.createElement("span");
                    let textUser = document.createTextNode(elementUser.name);
                    tagUser.appendChild(textUser);
                    // tagUser.style.paddingLeft = "13em"
                    nameUser.appendChild(tagUser);
                }
            });

        });
        simpleslider.getSlider({
            container: post,
            delay: 3,
            duration: 1,
            ease: bounceOut
        });
        simpleslider.getSlider({
            container: nameUser,
            delay: 3,
            duration: 1,
            ease: bounceOut
        });

    } catch (error) {
        console.log('Fetch Error', error);
    }
}

function bounceOut(time, begin, change, duration) {
    if ((time /= duration) < 1 / 2.75) {
        return change * (7.5625 * time * time) + begin;
    } else if (time < 2 / 2.75) {
        return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
    } else if (time < 2.5 / 2.75) {
        return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
    } else {
        return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
    }
}


document.addEventListener("DOMContentLoaded", getPosts);
