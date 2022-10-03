
function CustomMessageAlert({type, message, show=false}) {
    return ( <div class={`alert alert-${type} fade ${show?"show":""} position-fixed`} role="alert">
        <strong>{message}</strong>
    </div> );
}

export default CustomMessageAlert;