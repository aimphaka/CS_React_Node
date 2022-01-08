function BootstrapInput(props) {
    return (
        <div className="form-group my-2">
            <p>{props.label}</p>
            <input
                disabled={props.disabled ?? false}
                type={props.type ?? "text"}
                value={props.value}
                onChange={props.onChange}
                className="form-control"
                placeholder={"Enter " + props.label}
            />
        </div>
    );
}
export { BootstrapInput };
