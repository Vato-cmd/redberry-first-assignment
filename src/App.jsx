import Header from "./components/Header";
import Slider from "./components/Slider";

export default function App() {
  fetch("https://api.redclass.redberryinternship.ge/api/courses/featured")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div className="w-480 h-270 mx-auto my-0 bg-white">
      <Header />
      <Slider />
    </div>
  );
}
