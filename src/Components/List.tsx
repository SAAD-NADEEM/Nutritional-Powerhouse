import { useEffect } from "react";



const List = (props: any) => {

  useEffect(() => {
    document.getElementById("nutritional_facts")?.scrollIntoView()
  }, []);

  const { facts, desc, name, getContent } = props

  const { Calories, Carbohydrates, Sugar, Fiber, Proteins, Fats, Vitamins, Minerals } = JSON.parse(facts)

  const { scientific_name, category, description } = JSON.parse(desc)

  return (
    <section id="nutritional_facts" className="nutritional-facts-container">
      <div className="h2-ctn">
        <h2>Nutritional Facts</h2>
      </div>
      <div className="details-ctn">
        <ul className="flex-row">
          <li><span className="fs-paragraph title-span">Name: </span> {name}</li>
          <li><span className="fs-paragraph title-span">Scientific Name: </span> {scientific_name}</li>
          <li><span className="fs-paragraph title-span">Category: </span>{category}</li>
        </ul>
        <p>{description}</p>
      </div>
      <div className="nutritional-facts-grid">
        <div className="nutritional-fact">
          <span className="label">Calories:</span>
          <span className="value">{Calories}</span>
        </div>
        <div className="nutritional-fact">
          <span className="label">Carbohydrates:</span>
          <span className="value">{Carbohydrates}</span>
        </div>
        <div className="nutritional-fact">
          <span className="label">Sugar:</span>
          <span className="value">{Sugar}</span>
        </div>
        <div className="nutritional-fact">
          <span className="label">Fiber:</span>
          <span className="value">{Fiber}</span>
        </div>
        <div className="nutritional-fact">
          <span className="label">Proteins:</span>
          <span className="value">{Proteins}</span>
        </div>
        <div className="nutritional-fact">
          <span className="label">Fats:</span>
          <span className="value">{Fats}</span>
        </div>
      </div>
      <h3>Vitamins</h3>
      <div className="nutritional-facts-grid">
        {Vitamins.map((vitamin: any, index: any) => (
          <div key={index} className="nutritional-fact">
            <span className="label">{vitamin.Nutrient}:</span>
            <span className="value">{vitamin.value}</span>
          </div>
        ))}
      </div>
      <h3>Minerals</h3>
      <div className="nutritional-facts-grid">
        {Minerals.map((mineral: any, index: any) => (
          <div key={index} className="nutritional-fact">
            <span className="label">{mineral.Nutrient}:</span>
            <span className="value">{mineral.value}</span>
          </div>
        ))}
      </div>
      <div className="more-btn">
        <button onClick={getContent} className="uni-btn">Generate More</button>
      </div>
    </section>
  );
};

export default List;
