import React, { useEffect, useState } from 'react';
import { SideBarIcon } from "./styles";

export const IconOption = ({ text, Icon, active, primary, link }) => {

  return (
    <SideBarIcon active={true}>
        <Icon />
        <h2>{text}</h2>
    </SideBarIcon>
  );
};