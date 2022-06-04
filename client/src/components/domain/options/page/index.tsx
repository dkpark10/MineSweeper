import React from "react";
import Header from "../../../common/organisms/header";
import OptionWrapper from "../atoms/wrapper";
import OptionCard from "../organisms/option_card";

export default function Options() {

  return (
    <>
      <Header />
      <OptionWrapper>
        <OptionCard
          name="난이도"
        />
      </OptionWrapper>
    </>
  )
}