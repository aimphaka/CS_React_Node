import { useEffect, useState } from "react";
import { BootstrapInput } from "../components/BootstrapInput";
import { createQ, deleteQ, fetchAllQ, updateQ } from "../services/queue_services";

function QueueIndex(props) {
    const [form, setForm] = useState({
        id: "",
        name: "",
    });

    const [data, setData] = useState([]);

    const addQ = () => {
        createQ(form).then((e) => {
            if (e.status === 200) {
                alert("Add Queue Succesful");
                setForm({
                    id: "",
                    name: "",
                });
            } else {
                alert(e.data);
            }
            fetchAllQ().then((e) => setData(e.data.queues));
        });
    };

    const delQ = async (id) => {
        await deleteQ(id);

        // fetchAllQ().then((e) => setData(e.data.queues));
        const e = await fetchAllQ();
        setData(e.data.queues);
    };

    const updQ = async (id, data) => {
        const ret = await updateQ(id, data);
        if (ret.status === 200) {
            alert(`Updated ${data.name} successfully`);
        } else {
            alert(`${ret.data}`);
        }
        const e = await fetchAllQ();
        setData(e.data.queues);
    };

    useEffect(() => {
        fetchAllQ().then((e) => setData(e.data.queues));
    }, []);

    return (
        <div className="container">
            <div className="card my-4">
                <div className="card-body">
                    <div className="card-title">
                        <h2>Queue Management</h2>
                    </div>
                    <hr />
                    <div className="row">
                        {/* id = {form.id},name={form.name} */}
                        <div className="col-12">
                            <BootstrapInput
                                label="Id"
                                type="number"
                                onChange={(e) => setForm({ ...form, id: e.target.value })}
                                value={form.id}
                            />
                            <BootstrapInput
                                label="Name"
                                type="text"
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                value={form.name}
                            />
                            <button onClick={() => addQ()} className="btn btn-primary w-100">
                                Add Q
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <ul>
                        {data.map((e, index) => (
                            <li key={index} className="my-3">
                                <BootstrapInput
                                    label="id"
                                    value={e.id}
                                    disabled={true}
                                    onChange={(el) => {
                                        data[index].id = el.target.value;
                                        setData([...data]);
                                    }}
                                />
                                <BootstrapInput
                                    label="name"
                                    value={e.name}
                                    onChange={(el) => {
                                        data[index].name = el.target.value;
                                        setData([...data]);
                                    }}
                                />
                                <div className="row">
                                    <button
                                        onClick={() => updQ(e.id, { ...e })}
                                        className="btn btn-primary btn-sm col-6"
                                    >
                                        update
                                    </button>
                                    <button
                                        onClick={() => delQ(e.id)}
                                        className="btn btn-danger btn-sm col-6"
                                    >
                                        delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export { QueueIndex };
