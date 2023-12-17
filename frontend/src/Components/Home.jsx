import React from "react";
import obj from "../required_objects/object.ts";
import Auth from "../required_objects/authentication.ts";

export default function Home() {
  const obj1 = new obj("dummy");
  async function handleAddDoc() {
    console.log("done");
    const data = await obj1.addDoc({
      jsonData: {
        just: "just",
        key: "key1",
      },
    });
    console.log(data);
    alert("success");
  }
  async function handleGetDoc() {
    const data = await obj1.getDoc({
      just: "just",
      key: "key2",
    });
    alert("success");
    console.log(data);
  }
  async function signupuser() {
    const authobj = new Auth();
    const data = await authobj.signUpWithEmailAndPassword(
      "withtok1.com",
      "password123"
    );
    alert("success");
    console.log(data);
  }
  async function signinuser() {
    const authobj = new Auth();
    const data = await authobj.signInWithEmailAndPassword(
      "withtok1.com",
      "password123"
    );
    alert("success");
    console.log(data);
  }
  function handleSignOut() {
    const authobj = new Auth();
    authobj.signOut();
  }
  return (
    <div>
      <button onClick={handleAddDoc}>Add Doc</button>
      <button onClick={handleGetDoc}>Get Doc</button>
      <button onClick={signupuser}>signup</button>
      <button onClick={signinuser}>signin</button>
      <button onClick={handleSignOut}>signout</button>
    </div>
  );
}
