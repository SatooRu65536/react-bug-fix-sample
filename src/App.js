import "./App.module.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Manage from "./components/page/manage/manage";

function App() {
  return (
    <main>
      <Header />
      <Manage />
      <Footer />
    </main>
  );
}

export default App;
