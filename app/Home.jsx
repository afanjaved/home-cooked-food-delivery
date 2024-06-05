import React from 'react';
import { Redirect } from "expo-router";

function Home() {
  return (
    <Redirect href='/tabs' />
  );
}

export default Home;
