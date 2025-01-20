import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const server_url = import.meta.env.VITE_SERVER_URL;

  const [activeTab, setActiveTab] = useState("approveTab");
  const [users, setUsers] = useState([]);

  const [roles, setRoles] = useState({
    SuperUser: false,
    Admin: false,
    Principal: false,
    Student: false,
    Parent: false,
    Teacher: false,
    AcademicCoordinator: false,
  });

  const handleRoleChange = (userId, role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId
          ? {
              ...user,
              roles: user.roles.includes(role)
                ? user.roles.filter((r) => r !== role) // Remove role if already selected
                : [...user.roles, role], // Add role if not selected
            }
          : user
      )
    );

    console.log(" users in handleRoleChange", users);
  };

  const approveRights = async (user) => {
    try {
      const response = await axios.post(
        `${server_url}/api/admin/approveRights`,
        user
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(`error in approveRights frontend ${error.message} `);
    }
  };

  const updateApproval = (email) => {
    const approve = async (email) => {
      console.log("email is", email);

      try {
        const response = await axios.post(
          `${server_url}/api/admin/updateApproval`,
          { emailId: email }
        );

        if (response.data.success) {
          alert(response.data.message);

          setUsers(response.data.users);
          console.log("users... after status update...⛹️‍♀️⛹️‍♀️", users);
        } else {
          alert(response.data.message);
        }
        console.log("response of approval  ", response.data);
      } catch (error) {
        console.log(`error ${error.message}`);
      }
    };
    approve(email);
  };

  // when page is reloaded... we fetch the users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(`${server_url}/api/admin/getUsers`);
        // const fetchedUsers = response.data.users.map((user) => ({
        //   ...user,
        //   roles: [], // Initialize roles as an empty array
        // }));
        setUsers(response.data.users);
        //  console.log('users fetched ===>',fetchedUsers);
      } catch (error) {
        console.log("response error", error.message);
      }
    };

    const users = fetchUsers();
    console.log("users we got ", users);
  }, []);

  return (
    <div>
      <Navbar />
      <h1> Give and take rights ...</h1>
      <div className="tab-Buttons">
        <button
          className="tabButton"
          onClick={() => setActiveTab("approveTab")}
        >
          Approve Users
        </button>
        <button
          className="tabButton"
          onClick={() => setActiveTab("giveRights")}
        >
          Give Rights
        </button>
      </div>

      {/* Tab Contensts */}

      <div className="tab-container">
        <div className=" ">
          {activeTab === "approveTab" && (
            <div className="approve-user-div">
              <p>User Table</p>
              <table
                border="1"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>User Role</th>
                    <th>Department Name</th>
                    <th>Local ID</th>
                    <th>Username</th>
                    <th>Approved</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user ) => {
                    if (!user.approved) {
                      return (
                        <tr key={user._id}>
                          <td>{user.role}</td>
                          <td>{user.departmentName}</td>
                          <td>{user.localId}</td>
                          <td>{user.userName}</td>
                          <td
                            className={
                              user.approved ? "approved" : "not-approved"
                            }
                          >
                            {user.approved ? "Yes" : "No"}
                          </td>
                          <td>
                            <button
                              onClick={() => updateApproval(user.emailId)}
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      );
                    } 
                    
                  })}

                  <tr>Rest All are approved</tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "giveRights" && (
            <div className="approve-user-div">
              <p>Giving Rights</p>
              <table
                border="1"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Local ID</th>
                    <th>Username</th>
                    <th>Approved</th>
                    <th>Email-Id</th>
                    <th>User Roles</th>
                    <th>Rights Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.departmentName}</td>
                      <td>{user.localId}</td>
                      <td>{user.userName}</td>
                      <td
                        className={user.approved ? "approved" : "not-approved"}
                      >
                        {user.approved ? "Yes" : "No"}
                      </td>
                      <td>{user.emailId}</td>
                      {/* showing the roles of user */}
                      <td>
                        {user.roles.map((role, index) => (
                          <p key={index}>
                            {console.log(` role in td --->${role}`)}
                          </p>
                        ))}
                      </td>
                      <td>
                        <div>
                          {[
                            "Admin",
                            "Principal",
                            "Student",
                            "Parent",
                            "Teacher",
                            "AcademicCoordinator",
                          ].map((role) => (
                            <div key={role}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={user.roles.includes(role)} // Check if the role is in the array
                                  onChange={() =>
                                    handleRoleChange(user._id, role)
                                  } // Add or remove role
                                />
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </label>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => approveRights(user)}>
                          Update Rights
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
