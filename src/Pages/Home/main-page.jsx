import { useState } from "react";
import Header from "../Header";

import MainPropetys from "../MainPage/MainPage";

function MainPageLoad() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    console.log("valor: ", searchValue);
  };
  return (
    <div>
      <Header onSearch={handleSearch} />
      <MainPropetys />
    </div>
  );
}

export default MainPageLoad;
