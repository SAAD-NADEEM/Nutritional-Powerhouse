import { useState } from "react";
import Header from "./Components/Header";
import InputArea from "./Components/InputArea";
import List from "./Components/List"
import Content from "./Components/Content";
import About from "./Components/About";
import Loading from "./Components/Loading";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};



const App: React.FC = () => {

  const [toggleFacts, setToggleFacts] = useState(false)
  const [facts, setFacts] = useState('');
  const [desc, setDesc] = useState('')
  const [name, setName] = useState('')
  
  const [toggleContent, setToggleContent] = useState(false)
  const [contents, setContents] = useState('')
  const [features, setFeatures] = useState('')
  const [preserve, setPreserve] = useState('')
  const [cult, setCult] = useState('')
  const [prep, setPrep] = useState('')
  
  const [loading, setLoading] = useState<boolean>(false);

  const start = (id:string) => {
    document.getElementById(id)?.scrollIntoView()
  }
  
  // Nutritional Facts and description async function
  const getData = async (query: any) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json"
        }
      })

      const prompt1 = `
        give scientific name, category and description of ${query} in this json schema:
        "type": "object",
        "properties": {
          "scientific_name": { "type": "string"},
          "category": { "type": "string"},
          "description": { "type": "string", "description": "wrtie a brief description of ${query} such as its skin, texture, flavor, color, inside of it, along with a fact"}
        }
      `
      const desc = await model.generateContent(prompt1)
      const res_desc = desc.response
      const text_desc = res_desc.text()
      console.log(text_desc);

      const prompt =
        `acts as an nutrient expert, give detailed nutrient list of ${query} of 100g per serving, answer should only be the numbers with unit, in this json schema:
        {
          "type": "object",
          "properties": {
            "Calories": {"type": "string"},
            "Carbohydrates": {"type": "string"},
            "Sugar": {"type": "string"},
            "Fiber": {"type": "string"},
            "Proteins": {"type": "string"},
            "Fats": {"type": "string"},
            "Vitamins": {
              "type": "array",
              "items": {
                "type": "object",
                "description": "name all the vitamin this fruit contains, in json array with one property of the vitamin type or name, and one property of its value with its unit"
                "properties": {
                  "Nutrient": {"type": "string"},
                  "value": {"type": "string"},
                },
              },
            },
            "Minerals": {
              "type": "array",
              "items": {
                "type": "object",
                "description": "name all the Minerals this fruit contains, in json array with one property of the Mineral type or name, and one property of its value with its unit"
                "properties": {
                  "Nutrient": {"type": "string"},
                  "value": {"type": "string"},
                },
              },
            },
          },
          required: ["Calories","Carbohydrates","Sugar","Fiber","Proteins","Fats","Vitamins","Minerals"]
        }`

      const facts = await model.generateContent(prompt)
      const res = facts.response
      const text = res.text()
      console.log(text)

      setDesc(text_desc)
      setFacts(text)
      // setName(query)

      console.log(query)

      setLoading(false)
      setToggleFacts(true)
      start("nutritional_facts")
    } catch (error) {
      alert(error)
    }
  }

  // Content async function
  const getContent = async () => {
    setLoading(true)
    try {
      const para = name;
      
      console.log("para-" +para);
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        }
      })

      // propmpt for Benefits
      const prompt = `
      write atleast 5 paragraphs potential health benefits of ${para}, each paragraph should be brief but detailed explanation of how it gonna benefits an individual. Each should be of atleast 3-4 lines. take this as an example: "Heart Health: Avocados are rich in monounsaturated fats, particularly oleic acid, which is beneficial for heart health. These healthy fats help reduce bad cholesterol levels (LDL) while increasing good cholesterol (HDL). The potassium content in avocados also helps regulate blood pressure.
      Digestive Health: High in dietary fiber, avocados support healthy digestion, prevent constipation, and promote a balanced gut microbiome.
      Nutrient Absorption: The healthy fats in avocados enhance the absorption of fat-soluble vitamins (A, D, E, and K) from other foods, making them an excellent addition to salads and other nutrient-dense meals.
      Eye Health: Avocados contain lutein and zeaxanthin, two antioxidants that are crucial for eye health. These compounds protect the eyes from harmful blue light and reduce the risk of age-related macular degeneration.
      Bone Health: Avocados provide vitamin K, which is essential for bone health. Vitamin K helps in calcium absorption and bone mineralization, reducing the risk of fractures.
      Anti-inflammatory: The combination of monounsaturated fats, antioxidants, and phytochemicals in avocados has anti-inflammatory effects, which can help reduce chronic inflammation associated with diseases like arthritis.". In this array schema: 
      {
          "type": "object",
          "properties": 
            benefits:
              {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties":{
                    "heading": { "type": "string"},
                    "paragraph": { "type": "string"}
                  },
                  required: ["heading", "paragraph"]
                }
              }
      }`
      let result = await model.generateContent(prompt)
      let res = result.response
      let text = res.text()
      console.log(text);
      setContents(text)

      // prompt for Features
      const prompt2 = ` write features of ${para}(fruit/vegetable). Each paragraph should be brief with atleast 2-3 lines. Take this as an example:"Taste: Avocados have a rich, buttery flavor with a mild nuttiness. The taste is subtle, making it versatile in both savory and sweet dishes.
    Texture: Creamy and smooth when ripe. The flesh can be spreadable, making it ideal for use in spreads, dips, and as a topping.
    Color: The skin is typically dark green to blackish, while the flesh is pale green with a yellowish tint near the seed.
    Common Uses: Avocados are commonly used in guacamole, salads, sandwiches, smoothies, and as a substitute for butter in vegan recipes. They are also popular in sushi, toast, and desserts like avocado chocolate mousse.". In this json schema: 
      {
          "type": "object",
          "properties": {
            "Taste": {"type": "string"},
            "Texture": { "type": "string" },
            "Color": { "type": "string" },
            "Common_Uses": { "type": "string" }
          },
          required: ["Taste", "Texture", "Color", "Common_Uses"]
        }`
      result = await model.generateContent(prompt2)
      res = result.response
      text = res.text()
      console.log(text);
      setFeatures(text)

      // Prompt for Selection and storage
      const prompt3 = `
      write "How to choose", "Storage", "Shell life" of ${para}(fruit/vegetable), each paragraph should be briefly explained and in under 4-5 lines. Tkae this as an example: "How to Choose: Select avocados that yield to gentle pressure when held, indicating ripeness. Avoid avocados with large soft spots or indentations, as these may be overripe or damaged.
      Storage: Unripe avocados can be ripened at room temperature and then stored in the refrigerator once ripe to extend shelf life. To slow down ripening, place avocados in the fridge. Cut avocados should be stored with the pit in place and covered tightly to prevent browning.
      Shelf Life: Whole, unripe avocados can last 4-7 days at room temperature. Once ripe, they should be consumed within 1-2 days or stored in the refrigerator for up to 3-5 days.". In this json schema:
      {
          "type": "object",
          "properties": {
            "how_to_choose": {"type": "string"},
            "storage": { "type": "string" },
            "shell_life": { "type": "string" },
          },
          required: ["how_to_choose", "storage", "shell_life"]
        }`
      result = await model.generateContent(prompt3)
      res = result.response
      text = res.text()
      console.log(text)
      setPreserve(text)

      const prompt4 = `
      write origin and cultural uses of ${para}(fruit/vegetable). Each paragraph should be brief with atleast 2-3 lines. Take this as an example: "Origin: Avocados are native to Central and South America, with origins traced back to Mexico and Guatemala. They have been cultivated for over 7,000 years.
      Cultural Uses: In many cultures, avocados are a staple in traditional dishes. In Mexico, they are essential for making guacamole, a traditional dip or condiment. In the Philippines and Indonesia, avocados are used in desserts like avocado shakes and ice cream. Avocados have gained global popularity for their health benefits and versatility in various cuisines.". In this json schema:
      {
          "type": "object",
          "properties": {
            "origin": {"type": "string"},
            "cultural_uses": { "type": "string" },
          },
          required: ["origin", "cultural_uses"]
      }`
      result = await model.generateContent(prompt4)
      res = result.response
      text = res.text()
      console.log(text)
      setCult(text)

      const prompt5 = `
      write "how to prepare", "commmon pairing", and "Cooking methods" of ${para}(fruit/vegetable). Each paragraph should be of atleast 4-5 lines. Take this as an example: "How to Prepare: Wash the avocado skin before cutting. Slice lengthwise around the seed, twist the halves apart, and remove the seed. Scoop out the flesh with a spoon or slice it within the skin. Avocado flesh can be mashed, cubed, or sliced for various dishes.
      Common Pairings: Avocados pair well with lime, garlic, onion, tomatoes, cilantro, eggs, and a variety of meats, particularly chicken and fish. They also complement fruits like mango and berries in salads.
      Cooking Methods: Avocados are mostly eaten raw due to their delicate texture. However, they can be lightly grilled, blended into soups, or used in baked goods.". In this json schema:
      {
          "type": "object",
          "properties": {
            "how_to_prepare": {"type": "string"},
            "common_pairings": { "type": "string" },
            "cooking_methods": { "type": "string" }
          },
          required: ["how_to_prepare", "common_pairings", "cooking_methods"]
      }`
      result = await model.generateContent(prompt5)
      res = result.response
      text = res.text()
      console.log(text);
      setPrep(text)
      setLoading(false)
      setToggleContent(true)
    } catch (error) {
      alert(error)
    }
  }

  const handleSubmit = async (e: any) => {

    e.preventDefault()
    setLoading(true)
    const query = e.target.fruit.value
    const inputElement = document.getElementById('nutrition-input') as HTMLInputElement;
    const para = inputElement?.value;
    setName(para)
    if (query) {
      
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: {
            responseMimeType: "application/json"
          }
        })

        const prompt = `check if ${query} is actually a fruit name or a vegetable name, if yes then just say Yes, broccoli is also a vegetable, if not just say "No", remeber anything other than fruits or vegetable, or egg or anything like that, your answer should be "No". Your answer should either be Yes without any special characters or hidden white spaces, or "No"`

        const result = await model.generateContent(prompt)
        const res = await result.response
        const text: string = res.text()
        const trimed = text.trim()

        if (trimed === '"Yes"') {
          getData(query)

        }
        else {
          alert("Enter a valid name of a Fruit or Vegetable")
          setLoading(false)
          e.target.reset()
          document.getElementById("inputArea")?.scrollIntoView()
        }
      } catch (error) {
        alert(error)
        e.target.reset
      }
    }
    else {
      alert("Enter a valid name of a Fruit or Vegetable")
    }
  }

  return (
    <>
      <Header />
      <InputArea handleSubmit={handleSubmit} />
      {toggleFacts && (<List facts={facts} desc={desc} name={name} getContent={getContent} />)}
      {toggleContent && (<Content contents={contents} features={features} preserve={preserve} cult={cult} prep={prep} />)}
      {loading && (<Loading />)}
      <About />
    </>
  );
};

export default App;
