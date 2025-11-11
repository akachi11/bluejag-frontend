import React from "react";
import {
  AnnouncementContainer,
  AnnouncementHr,
  AnnouncementInfo,
  AnnouncementMenu,
  AnnouncementMenuItem,
  AnnouncementShopBtn,
  AnnouncementText,
} from "../Styles/NavbarStyles";

const Announcement = () => {
  return (
    <AnnouncementContainer className="bg-blue-950">
      <AnnouncementInfo>
        <AnnouncementText>
          FREE Delivery with Orders ₦70,000+🔥
        </AnnouncementText>
        <AnnouncementHr />
      </AnnouncementInfo>
    </AnnouncementContainer>
  );
};

export default Announcement;
