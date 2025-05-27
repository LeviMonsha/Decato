import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { NewsCardComponent } from "./components/NewsCardComponent";

export const NewsPage = () => {
  return (
    <div className="text-center py-12">
      Новости
      <NewsCardComponent />
    </div>
  );
};
