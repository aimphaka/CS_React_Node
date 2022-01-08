import { useEffect, useState } from "react";
import { BootstrapInput } from "../components/BootstrapInput.jsx";
import { getPosts } from "../services/posts_services.js";

function Home(props) {
    let [name, setName] = useState("");
    let [age, setAge] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        getPosts().then((ret) => {
            console.log(ret);
            setData(ret);
        });
    }, []);

    return (
        <div className="container">
            <div className="card mt-4">
                {/* .card-body>h4.card-title */}
                <div className="card-body">
                    <h4 className="card-title">Home</h4>
                    <hr />
                    <BootstrapInput
                        label="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <BootstrapInput
                        label="Your age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                {/* <div className="card-footer">
                    Name={name}, Age= {age}
                </div> */}
                {/* {1 + 1 === 2 ? "true" : "false"},{1 + 1 === 3 ? "true" : "false"},{v ?? "empty"} */}
            </div>
            <div className="card my-4">
                <div className="card-body">
                    <div className="card-title">
                        <h4>Posts data</h4>
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>title</th>
                                    <th>body</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e) => (
                                    <tr>
                                        <td>{e.title}</td>
                                        <td>{e.body}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Home };
