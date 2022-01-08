import axios from "axios";

async function getPosts() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const res = await axios.get(url);
    if (res.status === 200) {
        return res.data;
    }
    return [];
}

export { getPosts };
