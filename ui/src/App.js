import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

import * as actions from "./actions";
import Header from "./components/Header";
import MovieLists from "./components/MovieLists";
import DiaryForm from "./components/DiaryForm/DiaryForm";
import UserDiaries from "./components/Diary/UserDiaries";
import DiaryContent from "./components/Diary/DiaryContent/DiaryContent";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
    dispatch(actions.fetchDiaries());
  });

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={MovieLists} />
        <Route path="/write/:id" component={DiaryForm} />
        <Route path="/diary" exact component={UserDiaries} />
        <Route path="/diary/:id" component={DiaryContent} />
      </BrowserRouter>
    </div>
  );
};

export default App;
