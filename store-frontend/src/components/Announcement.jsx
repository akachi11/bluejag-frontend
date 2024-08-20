import { AnnouncementContainer, AnnouncementHr, AnnouncementInfo, AnnouncementMenu, AnnouncementMenuItem, AnnouncementShopBtn, AnnouncementText } from "../Styles/NavbarStyles"


const Announcement = () => {
  return (
    <AnnouncementContainer>
        <AnnouncementInfo>
            <AnnouncementText>
                FREE Delivery with Orders $300+
            </AnnouncementText>
            <AnnouncementHr />
            <AnnouncementShopBtn>
                Shop Now
            </AnnouncementShopBtn>
        </AnnouncementInfo>

        <AnnouncementMenu>
            <AnnouncementMenuItem>
                HELP
            </AnnouncementMenuItem>
            <AnnouncementHr />
            <AnnouncementMenuItem>
                FIND STORES 
            </AnnouncementMenuItem>
        </AnnouncementMenu>
    </AnnouncementContainer>
  )
}

export default Announcement
