function InForm(props:any) {
    const {triggle, handleSubmit} = props
    return (
        <form onSubmit={handleSubmit} className={`input-ctn flex-column center ${triggle && 'AnimatedInput'}`}>
            <p className="fs-heading">From Name to Specs,<br /> We've Got You</p>
            <input name="deviceName" type="text" placeholder="Search Device"/>
            <button type="submit"></button>
        </form>
    );
};

export default InForm;