import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingAddressScreen(props) {  
  // get shippingAddress from cart Object in redux store
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  // get userInfo from redux store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // if no userInfo, meaning user is not signed in, redirect to signin screen
  if (!userInfo) {
    props.history.push("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch save-shipping address action
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    // redirect to payment screen
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            value={fullName}
            id="fullName"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={address}
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter shipping address"
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={city}
            id="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            value={postalCode}
            id="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={country}
            id="country"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
