import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./features/Auth/Register/Register";
import Login from "./features/Auth/Login/Login";
import StoryLayout from "./layouts/StoryLayout";
import Missing from "./features/Missing/Missing";
import Story from "./features/Story/Story";
import Profile from "./features/Auth/Profile/Profile";
import ProfileLayout from "./layouts/ProfileLayout";
import StorySinglePage from "./features/StorySinglePage/StorySinglePage";
import CharacterListPage from "./features/Character/CharacterListPage";
import CharacterLayout from "./layouts/CharacterLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />} path="auth">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<StoryLayout />} path="stories">
        <Route index element={<Story />} />
        <Route path=":storyId" element={<StorySinglePage />} />
      </Route>

      <Route element={<ProfileLayout />} path="profile">
        <Route index element={<Profile />} />
      </Route>

      <Route element={<CharacterLayout />} path="editor/characters">
        <Route index element={<CharacterListPage />} />
      </Route>

      <Route path="*" element={<Missing />} />
    </Routes>
  );
}
