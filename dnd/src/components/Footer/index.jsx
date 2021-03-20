import React from "react";
import Payment from "../Payment";

function Footer() {
  return <button onClick={() => <Payment />}>Donate</button>;
}

export default Footer;
