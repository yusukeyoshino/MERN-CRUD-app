import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

import * as actions from "./actions";
import Header from "./components/Header";
import MovieLists from "./components/LandingPage/MovieLists";
import DiaryForm from "./components/DiaryForm/DiaryForm";
import UserDiaries from "./components/UserDiary/UserDiaries";
import DiaryContent from "./components/UserDiary/DiaryContent";
import Spinner from "./util/Spinner";
import Modal from "./util/Modal";

const spinnerSelector = (state) => state.isSpining;
const modalSelector = (state) => state.modal;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
    dispatch(actions.fetchDiaries());
  }, []);

  const isSpining = useSelector(spinnerSelector);
  const { open, title, noMessage, yesButton } = useSelector(modalSelector);

  return (
    <div>
      <Spinner open={isSpining} />
      <BrowserRouter>
        <Header />
        <Modal
          open={open}
          noMessage={noMessage}
          yesButton={yesButton}
          title={title}
        />
        <Route path="/" exact component={MovieLists} />
        <Route path="/write/:id" component={DiaryForm} />
        <Route path="/diary" exact component={UserDiaries} />
        <Route path="/diary/:id" component={DiaryContent} />
      </BrowserRouter>
    </div>
  );
};

export default App;
