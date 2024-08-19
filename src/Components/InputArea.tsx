

const InputArea = (props: any) => {
  const { handleSubmit } = props

  return (
    <section id="inputArea">
      <form onSubmit={handleSubmit} className="input-ctn flex-column center">
        <label >
          Enter a Fruit or Vegetable
        </label>
        <input
          type="text"
          id="nutrition-input"
          name="fruit"
          placeholder="e.g., Apple, Broccoli"
        />
        <button type="submit" className="fs-heading uni-btn">
          Analyze
        </button>
      </form>
    </section>
  );
};

export default InputArea;
