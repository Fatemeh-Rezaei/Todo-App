import ProfileFrom from "components/module/ProfileFrom";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async() => {
    const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({name, lastName, password}),
        headers: {"Content-Type": "application/json"}
    })
    const data = await res.json()
    console.log(data);
  }

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      <ProfileFrom
        name={name}
        setName={setName}
        lastName={lastName}
        setLastName={setLastName}
        password={password}
        setPassword={setPassword}
        submitHandler = {submitHandler}
      />
    </div>
  );
}

export default ProfilePage;
