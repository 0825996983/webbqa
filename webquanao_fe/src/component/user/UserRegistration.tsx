import React, { useState } from "react";

function UserRegistration() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //các biến báo lỗi
  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [message , setMessage]= useState("");

  //su ly thong tin
  const handleSubmit = async (e: React.FormEvent) => {
      //Clear any previous error message
      setErrorUserName('');
      setErrorPassword('');
      setErrorEmail('');
      setErrorConfirmPassword('');
    //tránh click liên tục
    e.preventDefault();
    // kiểm tra các điều kiện và gán kết quả vào biến
    const isUserNameValid = !await checkUsernameAlreadyExists(userName);
    const isPasswordValid = !await checkPassword(password);
    const isEmailValid = !await checkEmailAlreadyExists(email);
    const isConfirmPassword = !await checkConfirmPassword(confirmPassword);


    //kiểm tra tất cả điều kiện 
    if(isUserNameValid && isPasswordValid && isEmailValid && isConfirmPassword){
        try {
          const url = `http://localhost:8080/account/register`;
          const response = await fetch(url,{
            method: 'POST',
            headers:{
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              userName: userName,
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              activated: 0,
              activationCode:"" 


            })

          });
          if(response.ok){
            setMessage("Account registration successful. Please check your email to activate!")
          }else{
            setMessage("An error occurred while creating an account.")
          }

          
        } catch (error) {
          setMessage("An error occurred while creating an account.")
          
        }
    }


  };

  //kiểm tra tên đăng nhập
  const checkUsernameAlreadyExists = async (userName: string) => {
    //end point
    const url = `http://localhost:8080/user/search/existsByUserName?userName=${userName}`;
    //call api
    try {
      const response = await fetch(url);
      const data = await response.text();
      if (data === "true") {
        setErrorUserName("Username already exists ");
       
      }
      return false;
    } catch (error) {
      console.error("error checking login name :", error);
      return false; // xay ra loi
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //thay đổi giá trị
    setUserName(e.target.value);
    //kiểm tra
    setErrorUserName("");
    //Kiểm tra sự  tồn tại
    return checkUsernameAlreadyExists(e.target.value);
  };
  ////////

  //kiểm tra tên đăng nhập
  const checkEmailAlreadyExists = async (email: string) => {
    //end point
    const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
    //call api
    try {
      const response = await fetch(url);
      const data = await response.text();
      if (data === "true") {
        setErrorEmail("Email already exists ");
        return true;
      }
      return false;
    } catch (error) {
      console.error("error checking login name :", error);
      return false; // xay ra loi
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //thay đổi giá trị
    setEmail(e.target.value);
    //kiểm tra
    setErrorEmail("");
    //Kiểm tra sự  tồn tại
    return checkEmailAlreadyExists(e.target.value);
  };
  ////////

  //kiểm tra password
  const checkPassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorPassword(
        "Password must be at least 8 characters and include at least 1 special character"
      );
      return true;
    } else {
      setErrorPassword("");
      return false;
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //thay đổi giá trị
    setPassword(e.target.value);
    //kiểm tra
    setErrorPassword("");
    //Kiểm tra sự  tồn tại
    return checkPassword(e.target.value);
  };
  ////////

  //kiểm tra confirm password
  const checkConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      setErrorConfirmPassword("Password does not match");
      return true;
    } else {
      setErrorConfirmPassword("");
      return false;
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Thay đổi giá trị của confirmPassword
    const value = e.target.value;
    setConfirmPassword(value);

    // Kiểm tra sự tồn tại và tính đúng đắn của confirmPassword
    checkConfirmPassword(value);
  };

  return (
    <div className=" mt-36 pb-24">
      <h1 className="mt-5 text-center text-4xl font-bold mb-2">Sign Up</h1>
      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form action="" onSubmit={handleSubmit} className="form">
          <div className=" w-full  border-none mt-8 mb-8 ">
            <label
              htmlFor="firstName"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className="
              
        
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
               placeholder:font-semibold
               placeholder:text-xs
                "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/*  */}
          <div className=" w-full  border-none mt-8 mb-8">
            <label
              htmlFor="lastName"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="       
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
               placeholder:font-semibold
               placeholder:text-xs
                "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/*  */}
          <div className=" w-full  border-none mt-8 mb-8">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              phone Number
            </label>
            <input
              type="text"
              id="lastName"
              placeholder=" phone Number"
              className="
       
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
               placeholder:font-semibold
               placeholder:text-xs
                "
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/*  */}

          <div className=" w-full  border-none mt-8 mb-8">
            <label
              htmlFor="userName"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="  Username"
              className="
       
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
               placeholder:font-semibold
               placeholder:text-xs
                "
              value={userName}
              onChange={handleUserNameChange}
            />
            {errorConfirmPassword && (
              <div className="text-red-500 text-xs italic mt-2">
                {errorUserName}
              </div>
            )}
          </div>

          {/*  */}

          <div className=" w-full  border-none mt-8 mb-8">
            <label
              htmlFor="passwemailord"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder=" Email"
              className="
       
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
               placeholder:font-semibold
               placeholder:text-xs
                "
              value={email}
              onChange={handleEmailChange}
            />
            {errorConfirmPassword && (
              <div className="text-red-500 text-xs italic mt-2">
                {errorEmail}
              </div>
            )}
          </div>

          {/*  */}

          <div className=" w-full  border-none mt-8 mb-8 ">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              placeholder=" password"
              className="
       
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
               placeholder:font-semibold
               placeholder:text-xs
                "
              value={password}
              onChange={handlePasswordChange}
            />
            {errorConfirmPassword && (
              <div className="text-red-500 text-xs italic mt-2">
                {errorPassword}
              </div>
            )}
          </div>

          {/*  */}
          <div className=" w-full  border-none mt-8 mb-8  ">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-800 text-sm font-semibold mb-2 tracking-wide"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="  Confirm Password"
              className="
       
              bg-gray-100 
              border-none  /* Không có viền ban đầu */
              rounded-lg
               w-full 
               py-3 
              px-4 
              text-gray-900
              leading-tight 
              focus:border-none   /* Tắt border khi focus */
   
               hover:bg-white 
              transition-all 
              duration-300 
              placeholder:font-semibold
               placeholder:text-xs
                "
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errorConfirmPassword && (
              <div className="text-red-500 text-xs italic mt-2">
                {errorConfirmPassword}
              </div>
            )}
          </div>
          {/*  */}
          <div className="text-center">
            <button
              type="submit"
              className=" bg-gray-800 hover:bg-[#222] text-white font-bold py-3 px-6 rounded-lg w-2/5 shadow-lg  focus:outline-none focus:ring-4 focus:ring-indigo-300 transition  ease-in-out transform hover:scale-105 active:scale-95"
            >
              Create Account
            </button>
               <div className="text-green-600 text-base italic mt-2">
                {message}
                </div>
          </div>
          



        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
