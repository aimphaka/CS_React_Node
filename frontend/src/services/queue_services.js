import axios from "axios";

async function createQ(data) {
    const res = await axios.post("http://localhost:3000/queues", { ...data });
    return res;
}

async function updateQ(id, data) {
    const res = await axios.put("http://localhost:3000/queues/" + id, { ...data });
    return res;
}

async function deleteQ(id) {
    const res = await axios.delete("http://localhost:3000/queues/" + id);
    return res;
}

const fetchAllQ = async () => {
    const res = await axios.get("http://localhost:3000/queues");
    return res;
};

export { createQ, updateQ, fetchAllQ, deleteQ };
