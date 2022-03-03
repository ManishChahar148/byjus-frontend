/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import Button from "./Components/Button";
import Popup from "./Components/Popup";
import { getAllUsers, createUser, deleteUser } from "./api";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [joining, setJoining] = useState("");

  const [users, setUsers] = useState([]);

  const [id, setId] = useState("");

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res);
        setUsers(...users, res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onAddUser = (e) => {
    e.preventDefault();
    console.log(joining);
    createUser({
      name: name,
      email: email,
      address: address,
      joiningDate: joining,
    })
      .then((res) => {
        console.log(res.data.user);
        setUsers([...users, res.data.user]);
        setIsAddPopupVisible(false);
        setName('');
        setEmail('');
        setAddress('');
        setJoining('')
        toast.success('User Added Successfully');
      })
      .catch(() => {
        toast.error('Failed to add user');
      });
  };

  const onDeleteUser = (e) => {
    e.preventDefault();
    deleteUser(id)
      .then((res) => {
        const filtered = users.filter(u => String(u._id) !== (res.data.userId));
        setUsers(filtered);
        setIsDeletePopupVisible(false);
        setId("")
        toast.success('User Removed Successfully');
      })
      .catch(() => {
        toast.error('Failed to remove user');
      });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <h1 className="sticky top-0 py-2 text-2xl text-center bg-white shadow-md text-purple">
        User Management Module
      </h1>
      <div className="container App">
        <div className="flex justify-between my-10 ">
          <Button onClick={() => setIsAddPopupVisible(true)} label="Add User" />
          <Button
            onClick={() => setIsDeletePopupVisible(true)}
            label="Remove User"
          />
        </div>

        <Popup
          title="Add User"
          open={isAddPopupVisible}
          handleClose={() => setIsAddPopupVisible(false)}
        >
          <form className="flex flex-col items-center" onSubmit={onAddUser}>
            <div className="flex flex-col w-full px-10 mt-6">
              <label className="text-lg">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[1px] focus:border-purple w-full outline-none border-black/50 rounded-md px-2 py-2"
                placeholder="Enter your name"
                type="text"
              ></input>
            </div>
            <div className="flex flex-col w-full px-10 mt-6">
              <label className="text-lg">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[1px] focus:border-purple w-full outline-none border-black/50 rounded-md px-2 py-2"
                placeholder="Enter your email"
                type="email"
              ></input>
            </div>
            <div className="flex flex-col w-full px-10 mt-6">
              <label className="text-lg">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border-[1px] focus:border-purple w-full outline-none border-black/50 rounded-md px-2 py-2"
                placeholder="Enter your address"
                type="text"
              ></input>
            </div>
            <div className="flex flex-col w-full px-10 mt-6">
              <label className="text-lg">Joining Date</label>
              <input
                value={joining}
                onChange={(e) => setJoining(e.target.value)}
                className="border-[1px] focus:border-purple w-full outline-none border-black/50 rounded-md px-2 py-2"
                placeholder="Enter your joining date"
                type="date"
              ></input>
            </div>
            <div className="mt-2">
              <Button label="Add" />
            </div>
          </form>
        </Popup>

        <Popup
          title={"Remove User"}
          open={isDeletePopupVisible}
          handleClose={() => setIsDeletePopupVisible(false)}
        >
          <form className="flex flex-col items-center" onSubmit={onDeleteUser}>
            <div className="flex flex-col w-full px-10 mt-6">
              <label className="text-lg">User Id</label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="border-[1px] focus:border-purple w-full outline-none border-black/50 rounded-md px-2 py-2"
                placeholder="Enter user id"
                type="text"
              ></input>
            </div>

            <div className="mt-2">
              <Button label="Delete" />
            </div>
          </form>
        </Popup>

        <div className="">
          <ul className="flex justify-between bg-purple ">
            <li className="w-1/5 py-2 font-bold border-r-[1px] last:border-r-0 border-r-white/20 text-md text-white">
              User Id
            </li>
            <li className="w-1/5 py-2 font-bold border-r-[1px] last:border-r-0 border-r-white/20 text-md text-white">
              Name
            </li>
            <li className="w-1/5 py-2 font-bold border-r-[1px] last:border-r-0 border-r-white/20 text-md text-white">
              Email
            </li>
            <li className="w-1/5 py-2 font-bold border-r-[1px] last:border-r-0 border-r-white/20 text-md text-white">
              Address
            </li>
            <li className="w-1/5 py-2 font-bold border-r-[1px] last:border-r-0 border-r-white/20 text-md text-white">
              Joining date
            </li>
          </ul>

          {users.map((user) => (
            <ul key={String(user._id)} className="flex justify-between border-[1px] border-b-0  hover:bg-purple/20 odd last:border-b-[1px] border-black/20">
              <li
                title={user.userId}
                className=" px-1 text-ellipsis overflow-hidden whitespace-nowrap w-1/5 py-2 font-normal border-r-[1px] last:border-r-0 border-r-black/20 text-md"
              >
                {user._id}
              </li>
              <li
                title={user.name}
                className="px-1 text-ellipsis overflow-hidden whitespace-nowrap w-1/5 py-2 font-normal border-r-[1px] last:border-r-0 border-r-black/20 text-md"
              >
                {user.name}
              </li>
              <li
                title={user.email}
                className="px-1 text-ellipsis overflow-hidden whitespace-nowrap w-1/5 py-2 font-normal border-r-[1px] last:border-r-0 border-r-black/20 text-md"
              >
                {user.email}
              </li>
              <li
                title={user.address}
                className="px-1 text-ellipsis overflow-hidden whitespace-nowrap w-1/5 py-2 font-normal border-r-[1px] last:border-r-0 border-r-black/20 text-md"
              >
                {user.address}
              </li>
              <li
                title={user.joiningDate}
                className="px-1 text-ellipsis overflow-hidden whitespace-nowrap w-1/5 py-2 font-normal border-r-[1px] last:border-r-0 border-r-black/20 text-md"
              >
                {user.joiningDate}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
