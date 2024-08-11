import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login/Login";
import Register from "./features/Auth/Register/Register";
import CharacterListPage from "./features/Character/CharacterListPage";
import EpisodeEditor from "./features/Editor/EpisodeEditor";
import Emotion from "./features/Emotion/Emotion";
import Missing from "./features/Missing/Missing";
import Profile from "./features/Profile/Profile";
import Story from "./features/Story/Story";
import StorySinglePage from "./features/StorySinglePage/StorySinglePage";
import Wardrobe from "./features/Wardrobe/Wardrobe";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import StoryLayout from "./layouts/StoryLayout";
import AuthProvider from "./features/Auth/Context/AuthProvider";
import Unauthorized from "./features/Auth/Unauthorized";
import RequireAuth from "./features/Auth/RequireAuth";
import PersistLogin from "./features/Auth/PersistAuth";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />} path="auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  "scriptwriter",
                  "editor",
                  "headscriptwriter",
                  "translator",
                ]}
              />
            }
          >
            <Route element={<StoryLayout />} path="stories">
              <Route index element={<Story />} />
              <Route path=":storyId" element={<StorySinglePage />} />
              <Route path=":storyId/emotions" element={<Emotion />} />
              <Route path=":storyId/wardrobes" element={<Wardrobe />} />
              <Route
                path=":storyId/characters"
                element={<CharacterListPage />}
              />
              <Route
                path=":storyId/editor/episodes/:episodeId"
                element={<EpisodeEditor />}
              />
            </Route>
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  "translator",
                  "editor",
                  "headscriptwriter",
                  "scriptwriter",
                ]}
              />
            }
          >
            <Route element={<ProfileLayout />} path="profile/:staffId">
              <Route index element={<Profile />} />
            </Route>
          </Route>

          <Route element={<Unauthorized />} path="unauthorized" />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
